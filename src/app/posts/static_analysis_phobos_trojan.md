---
title: "Unmasking a Malicious Word Macro Dropper"
date: "2025-07-20"
excerpt: "Static analysis of a malicious Word document that uses VBA macros to deploy a multi-stage infection chain."
tags: ["trojan", "dropper", "downloader", "vba macro", "static-analysis"]
---

## About
This analysis examines a **malicious Word document** that leverages **VBA macros** to extract hidden strings, drop executables, and initiate a multi-stage infection chain involving a **dropper, downloader, and final payload**.

Imagine receiving what looks like an ordinary invoice. You open it, see nothing unusual, and close the document — but that single action silently awakens hidden code. In the background, the document clones itself as PDF and Excel files, downloads additional malware from a remote server, and prepares the ground for a trojan to take control.

> **Warning**: Do not navigate to any URLs mentioned in this analysis.

---

## Triage  

### Fingerprint & Threat Intel
Classified as a **trojan, dropper, and downloader**. It shares similarities with the following malware families **Valyria**, **W97M**, and **Sagent**. These families are known for malicious VBA macros across Microsoft Office applications used to deliver multi-stage payloads.
> sha256 hash: `667f88e8dcd4a15529ed02bb20da6ae2e5b195717eb630b20b9732c8573c4e83`

![alt text](/images/image2.png)

![alt text](/images/image3.png)

### File Type  
OLE2 Word Document. These files behave like a mini file system within a single binary, storing text, macros, and embedded objects. They require a host application such as Microsoft Office applications for execution. 

![alt text](/images/image4.png)
Now that we know it is an OLE file we will use oleid tool to extract information about the Word document. And as we can see it has malicious VBA macros source code. Imagine if your Word document could 'record' your repetitive keystrokes, then replay them automatically to save you time. That’s essentially what VBA macros does, they’re tiny programs inside Office files that automate repetitive tasks, but can also be used for malicious reasons.
![alt text](/images/image1.png)

### File Structure
Through the use of oledump we are able to extract the internal file structure of the word document.

![alt text](/images/image5.png)

The `M` label on stream 8 indicates that file contains VBA code. We'll investigate this and the Word document stream to locate embedded payloads.

---

## VBA Macros (Dropper)

The macros was extracted using **oledump** in verbose mode. 

![alt text](/images/image6.png)

 The `Document_Close` event triggers `Form_Close` Sub, which:
- Deletes part of the document's content (`ActiveDocument.Range(Start:=0, End:=3561).Delete`).
- Saves the document under multiple formats (`.xls`, `.doc`, `.pdf`).
- Appends a `ksh1` suffix to command strings (likely a campaign ID). - we'll circle back on this later
- Creates a COM object (`Ms13`) for further execution.
- Calls `SetTask` to schedule the dropped files.
- Invokes the `In` function for final execution. - we'll come across this function later 

**Interesting Functions**
- **`Button_Click2`**: Purposely well named to throw off analysis, but there is no button to be clicked. Extracts hidden strings (likely Base64-encoded payloads) from Word paragraphs.
  > Button_Click2(4, 22) - goes to paragraph 4 and extracts 22 characters
- **`SaveAs3`**: Saves the document in multiple formats -> pdf, xls and word.
- **`SetTask`**: Likely handles persistence and execution through the sleep API function and calling the In function which executes some actions we'll see later.

![alt text](/images/image7.png)

`olevba` confirms auto-execution on (`Document_Close`) and flags suspicious `CreateObject` usage. The extraction of strings suggests embedded executables.

---

## Word Document (Trojan)

We have found that the macros code is extracting strings from the document therefore let's take a look at the word document dump, we'll do this using oledump.
![alt text](/images/image8.png)

The raw Word content reveals decoy text followed by **TVq**, indicating a Base64-encoded executable (TVq → MZ header → PE file). Decoding this reveals a binary that the word document drops and executes.

---

## Embedded Executable (Downloader)
Through **base-64 -d [filename]** - we decode and extract the executable

![alt text](/images/image10.png) 

### Executable Overview 
![alt text](/images/image9.png)

I initially used Cutter for a quick overview of the executable. It is a 32-bit PE file that, although flagged as a DLL in the PE header, it operates like an executable. 

It is a GUI application, not encrypted, shows moderate entropy and has no stack protection making it vulnerable to buffer overflow attacks.

**Imports**

- **Kernel32.dll** - core dll in Windows systems. Provides Apis to interact with the kernel by exposing the Win32 base API. Used in Memory management, input/output and process/thread management etc.
- **vcruntime.dll** - Part of the Microsoft Visual C++ Redistributable package. Contains libraries required by apps built using Ms Visual C++ tools. (MSVC)

**Exports** 

- **In function** - the entry point of the executable.

![alt text](/images/image.png)

This section revealed that LDR.dll is responsible for invoking the In function, as shown in the diagram below. The appearance of *In* in the Export Name Pointer Table confirms that the DLL explicitly exposes this function for external calls.

Here’s how it works:

- DAT_1000212c points to the address 0x1000213a, which contains the ASCII string "In".

- This pointer is part of the PE’s export directory, which maps function names to their addresses.

- Manual load (statically) → Parse export table → Resolve "In" → Call entry function (bypassing DllMain).

> This behavior resembles **reflective DLL loading**, where a helper like `LDR.dll` manually injects the DLL and calls exported functions like `"In"` without using Windows APIs like `LoadLibrary`. Since the OS isn’t involved in the loading process, it can’t track or monitor the DLL's execution, unlike standard DLLs, which trigger `DllMain` and are registered with the OS loader. 

> Hence, the DLL operates outside the typical monitoring perimeter of the operating system allowing its execution to remain hidden from security mechanisms that rely on standard module registration and loader events.

![alt text](/images/image16.png)

Its capabilities are similar to malware families such as mint (mintsloader), tiny (tinyturla), trickbot. These malware families share similarities in multi-stage modular loader frameworks that deliver additional payloads, presenting a playground for various attacks such as: credential theft and maintaining persistence.


### Extracted Strings 

![alt text](/images/image11.png)

Suspicious strings reveal DLL imports, exports, directory, process creation, suspicious IP,URL and API calls.

### Functions Observed

I used ghidra for disassemmbly and decompiling this binary file for easier detailed analysis. 

**Main Function (In function)** 
![alt text](/images/image12.png)
- The main function named as *In* which we saw being called earlier in the vba macros code, acts as the entry point and contains three functions that are used for the next stage of the attack. 



**Function 1 (FUN_1000107f)**
![alt text](/images/image13.png)
- First function involves creating a directory (`C:\\Users\\Public\\cs5`) utilizing the kernel32.dll API Function **CreateDirectory** 

**Function 2 (FUN_10001012)**
![alt text](/images/image14.png)
- Second function downloads an executable from the internet specifically the URL and IP `http://178.62.19.66/campo/v/v` through the urlmon.dll API Function **URLDownloadToFile** and then appending the downloaded executable `cs5.exe` into the created directory

**Function 3 (FUN_100010d0)**
![alt text](/images/image15.png)
- Last function sets up the environment for the executables' execution by setting specific memory blocks and object handles pointing to the stack frame to null. It also launches the 
`cs5.exe` and creates a new process and its primary thread. Finally it disables redirection to wow64 folder which has file configurations for 32-bit applications. Meaning this is a 32-bit installer/downloader that is targeting 64-bit windows systems. A technique widely used for distributing software but also used for malicious campaigns.


### Key Windows API Calls
1. **CreateDirectory** – create a new directory
2. **URLDownloadToFileA** – allows a program to download files from the internet.
3. **CreateProcess** – create a new process and its primary thread.
4. **LoadLibrary** – dynamically loads a dll or an exe that the current running program wants to use at runtime.
5. **GetProcAddress** – fecthes the memory address of the function requested from the dlls export table.
6. **CloseHandle** – closes open object handles, such as process/file handles.
7. **Wow64DisableWow64FsRedirection** – disables file system redirection for 32-bit executables on 64-bit windows systems.

*Wow64 is used to perform file redirection for 32 bit applications that are being executed within a 64-bit windows system environment. In a 64-bit environment, when file redirection happens the 32-bit applications are redirected to use the system/wow64 folder that contains configurations for 32-bit applications. In this case when redirection is disabled for 32-bit application it uses the system32 configurations that are for 64-bit applications.*

---

## Attack Chain
| Stage | Component        | Role            | Key Evidence                               |
|-------|------------------|-----------------|--------------------------------------------|
| **0** | Word Document    | Trojan Dropper  | Macros (`Document_Close`), hidden streams   |
| **1** | Embedded Binary  | Downloader      | `URLDownloadToFileA`, IP `178.62.19.66`    |
| **2** | `cs5.exe`        | Final Payload   | Executed via `CreateProcess`, behavior TBD |

---

## Indicators of Compromise (IOCs)
- **File:** `cs5.exe`
- **Directory:** `C:\\Users\\Public\\cs5`
- **Network:** `http://178.62.19.66/campo/v/v` 
- **Hashes:** - sha256hash
    > word document - `667f88e8dcd4a15529ed02bb20da6ae2e5b195717eb630b20b9732c8573c4e83`

    > binary file downloader - `8755bea3f2e9e02646623f6a01dc2b0b6f5d8a2cf23f509ad824f1015b3debd0`

---

## Tools
- **OleTools** (oledump, olevba, oleid) – Extracted macros and analyzed OLE structure.
- **Ghidra** – Disassembled and analyzed the binary.
- **Capa** – Mapped behaviors to MITRE ATT&CK (`T1129`).
- **VirusTotal** – Provided hash reputation and Antivirus detection.
- **Remnux** - virtual environment specifically for analysis

---

## Conclusion

The sample is a multi-stage attack delivered via a malicious trojan Word document. Extracts hidden strings in hidden paragraphs pointing to an executable and a URL. Uses decoy data (lorem ipsum text) to appear harmless.

Uses **T1129 (Shared Modules)** technique. The malware’s use of runtime linking exemplifies modern evasion tactics by blending legitimate Windows functionality with malicious intent. This approach avoids static imports, helping it evade signature-based detection while maintaining full functionality.It also targets 64-bit systems via `Wow64` manipulation. Finally possibly uses `reflective DLL loading technique`.

**Next Steps**: Dynamic analysis of `cs5.exe` to uncover:
- C2 communication patterns  
- Post-exploitation activities  

To be done later for now focus is on static analysis


---



