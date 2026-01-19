/**
 * Linux Setup Helper - User State Types
 * 
 * These types define the persistent state tracked for each user
 * to provide contextual, distro-specific help.
 * 
 * Comprehensive coverage for the Linux ecosystem diversity.
 */

// ============================================
// Experience Level
// ============================================

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

// ============================================
// Distribution Base Families
// ============================================

export type DistroBase = 
  // Major families
  | 'debian'        // Debian, Ubuntu, Mint, Pop!_OS, elementary, Zorin, MX, Kali, Deepin, etc.
  | 'ubuntu'        // Ubuntu-specific derivatives (technically Debian but with PPAs, snap, etc.)
  | 'rhel'          // RHEL, CentOS, Rocky, Alma, Oracle Linux, Scientific Linux
  | 'fedora'        // Fedora, Nobara, Ultramarine (dnf but more cutting-edge than RHEL)
  | 'arch'          // Arch, Manjaro, EndeavourOS, Garuda, ArcoLinux, Artix, Parabola
  | 'suse'          // openSUSE Leap, Tumbleweed, SLES, GeckoLinux
  | 'gentoo'        // Gentoo, Funtoo, Calculate, Sabayon/MocaccinoOS
  | 'slackware'     // Slackware, Salix, Zenwalk, Porteus
  | 'void'          // Void Linux
  | 'alpine'        // Alpine Linux (musl-based, containers)
  | 'nixos'         // NixOS (declarative)
  | 'guix'          // GNU Guix System
  | 'solus'         // Solus (eopkg)
  | 'clear'         // Clear Linux (Intel)
  | 'mageia'        // Mageia (Mandriva successor)
  | 'pclinuxos'     // PCLinuxOS
  | 'puppy'         // Puppy Linux family
  | 'tinycore'      // Tiny Core Linux
  | 'bedrock'       // Bedrock Linux (multi-distro)
  | 'android'       // Android-based (Termux context)
  | 'chromeos'      // Chrome OS / ChromeOS Flex (Crostini)
  | 'steamdeck'     // SteamOS 3.x (Arch-based but unique)
  | 'immutable'     // Fedora Silverblue/Kinoite, openSUSE MicroOS, Vanilla OS, blendOS
  | 'independent'   // Truly independent distros
  | 'unknown';

// ============================================
// Package Managers (Primary)
// ============================================

export type PackageManager = 
  // Debian family
  | 'apt'           // Debian, Ubuntu, Mint, etc. (apt-get wrapper)
  | 'apt-get'       // Direct apt-get (older scripts)
  | 'dpkg'          // Low-level .deb handling
  | 'nala'          // Modern apt frontend
  
  // RPM family
  | 'dnf'           // Fedora 22+, RHEL 8+, CentOS 8+
  | 'yum'           // RHEL 7, CentOS 7, older Fedora
  | 'rpm'           // Low-level RPM handling
  | 'dnf5'          // Next-gen dnf (Fedora 39+)
  | 'microdnf'      // Minimal dnf for containers
  
  // Arch family  
  | 'pacman'        // Arch, Manjaro, EndeavourOS
  | 'yay'           // AUR helper (Go)
  | 'paru'          // AUR helper (Rust)
  | 'trizen'        // AUR helper
  | 'pamac'         // Manjaro GUI/CLI
  
  // SUSE family
  | 'zypper'        // openSUSE, SLES
  | 'yast'          // YaST package module
  
  // Gentoo family
  | 'emerge'        // Portage (Gentoo)
  | 'cave'          // Paludis (alternative)
  
  // Slackware family
  | 'slackpkg'      // Official Slackware
  | 'slapt-get'     // apt-like for Slackware
  | 'sbopkg'        // SlackBuilds.org helper
  
  // Independent/Other
  | 'xbps'          // Void Linux
  | 'apk'           // Alpine Linux
  | 'nix'           // NixOS / Nix package manager
  | 'guix'          // GNU Guix
  | 'eopkg'         // Solus
  | 'swupd'         // Clear Linux
  | 'urpmi'         // Mageia
  | 'equo'          // Sabayon (deprecated)
  | 'cards'         // NuTyX
  | 'pkg'           // FreeBSD (for reference)
  | 'tce-load'      // Tiny Core
  | 'petget'        // Puppy Linux
  | 'tazpkg'        // SliTaz
  | 'kpkg'          // Kwort
  | 'prt-get'       // CRUX
  | 'kiss'          // KISS Linux
  | 'blend'         // blendOS
  
  // Universal/Cross-distro
  | 'flatpak'       // Sandboxed apps (Flathub)
  | 'snap'          // Canonical's sandboxed format
  | 'appimage'      // Portable (not really a PM)
  | 'brew'          // Homebrew/Linuxbrew
  | 'nix-env'       // Nix on non-NixOS
  | 'cargo'         // Rust packages
  | 'pip'           // Python packages
  | 'npm'           // Node.js packages
  | 'pipx'          // Python CLI tools
  
  // Immutable distro tools
  | 'rpm-ostree'    // Fedora Silverblue/Kinoite
  | 'transactional-update' // openSUSE MicroOS
  | 'abroot'        // Vanilla OS
  | 'system-update' // Endless OS
  
  | 'unknown';

// ============================================
// Secondary/Supplementary Package Sources
// ============================================

export type SecondaryPackageManager = 
  | 'flatpak'
  | 'snap'
  | 'appimage'
  | 'brew'
  | 'nix-env'
  | 'aur'           // Arch User Repository
  | 'copr'          // Fedora COPR
  | 'ppa'           // Ubuntu PPAs
  | 'obs'           // openSUSE Build Service
  | 'snap-store'
  | 'flathub'
  | 'none';

// ============================================
// Desktop Environments (Comprehensive)
// ============================================

export type DesktopEnvironment = 
  // Major DEs
  | 'gnome'         // GNOME Shell (Ubuntu default, Fedora Workstation)
  | 'kde'           // KDE Plasma (Kubuntu, Fedora KDE, openSUSE)
  | 'xfce'          // Xfce (Xubuntu, MX Linux)
  | 'cinnamon'      // Cinnamon (Linux Mint default)
  | 'mate'          // MATE (Ubuntu MATE, traditional GNOME 2 fork)
  | 'lxde'          // LXDE (lightweight, GTK2)
  | 'lxqt'          // LXQt (lightweight, Qt-based)
  | 'budgie'        // Budgie (Solus, Ubuntu Budgie)
  | 'pantheon'      // Pantheon (elementary OS)
  | 'deepin'        // Deepin DE (Deepin, UbuntuDDE)
  | 'enlightenment' // Enlightenment (E17+)
  | 'unity'         // Unity (Ubuntu Unity, legacy Ubuntu)
  | 'cosmic'        // COSMIC (Pop!_OS new Rust DE)
  | 'cutefish'      // CutefishDE (discontinued but used)
  | 'lumina'        // Lumina (TrueOS/BSD origin)
  | 'trinity'       // Trinity DE (KDE 3 fork)
  | 'ukui'          // UKUI (Ubuntu Kylin)
  | 'dde'           // Deepin Desktop Environment (alias)
  
  // Tiling Window Managers (standalone)
  | 'i3'            // i3wm (X11 tiling)
  | 'i3-gaps'       // i3-gaps fork
  | 'sway'          // Sway (Wayland i3-compatible)
  | 'hyprland'      // Hyprland (Wayland, animated)
  | 'bspwm'         // bspwm (binary space partitioning)
  | 'dwm'           // dwm (suckless, minimal)
  | 'awesome'       // AwesomeWM (Lua config)
  | 'xmonad'        // XMonad (Haskell)
  | 'qtile'         // Qtile (Python)
  | 'herbstluftwm'  // herbstluftwm
  | 'spectrwm'      // spectrwm
  | 'leftwm'        // LeftWM (Rust)
  | 'river'         // River (Wayland, Zig)
  | 'wayfire'       // Wayfire (Wayland compositor)
  | 'labwc'         // labwc (Wayland, openbox-like)
  | 'openbox'       // Openbox (stacking, often with tint2)
  | 'fluxbox'       // Fluxbox
  | 'icewm'         // IceWM
  | 'jwm'           // JWM (Joe's Window Manager)
  | 'fvwm'          // FVWM (classic)
  | 'windowmaker'   // Window Maker (NeXTSTEP-like)
  | 'afterstep'     // AfterStep
  | 'ratpoison'     // ratpoison (keyboard-driven)
  | 'stumpwm'       // StumpWM (Common Lisp)
  | 'wmii'          // wmii
  | 'notion'        // Notion (ion3 fork)
  | 'niri'          // niri (Wayland, scrolling)
  
  // Special cases
  | 'wsl-gui'       // WSLg (Windows integration)
  | 'none'          // Server/headless/TTY only
  | 'custom'        // Custom/mixed setup
  | 'unknown';

// ============================================
// Display Server / Protocol
// ============================================

export type DisplayServer = 
  | 'x11'           // X.Org / Xorg
  | 'wayland'       // Wayland (various compositors)
  | 'xwayland'      // XWayland (X11 apps on Wayland)
  | 'mir'           // Mir (Ubuntu Touch, some IoT)
  | 'framebuffer'   // Direct framebuffer (fbdev)
  | 'drm'           // DRM/KMS console
  | 'wslg'          // WSLg display
  | 'vnc'           // VNC server (remote)
  | 'rdp'           // RDP/xrdp
  | 'none'          // Headless/TTY
  | 'unknown';

// ============================================
// Display Manager (Login Manager)
// ============================================

export type DisplayManager = 
  | 'gdm'           // GNOME Display Manager
  | 'sddm'          // Simple Desktop Display Manager (KDE)
  | 'lightdm'       // LightDM (cross-DE)
  | 'lxdm'          // LXDE Display Manager
  | 'xdm'           // X Display Manager (classic)
  | 'slim'          // SLiM (deprecated)
  | 'nodm'          // No-DM auto-login
  | 'ly'            // Ly (TUI display manager)
  | 'tbsm'          // tbsm (TUI)
  | 'emptty'        // emptty (TTY)
  | 'greetd'        // greetd (minimal, Wayland)
  | 'tuigreet'      // tuigreet (greetd TUI greeter)
  | 'lemurs'        // Lemurs (Rust TUI)
  | 'entrance'      // Entrance (Enlightenment)
  | 'console'       // TTY login (startx)
  | 'none'          // No display manager
  | 'unknown';

// ============================================
// Boot Configuration
// ============================================

export type BootType = 
  | 'single'            // Linux only
  | 'dual-windows'      // Dual boot with Windows
  | 'dual-macos'        // Dual boot with macOS
  | 'multi-linux'       // Multiple Linux distros
  | 'triple-boot'       // Windows + macOS + Linux or multiple
  | 'vm-virtualbox'     // VirtualBox VM
  | 'vm-vmware'         // VMware VM
  | 'vm-kvm'            // KVM/QEMU VM
  | 'vm-hyperv'         // Hyper-V VM
  | 'vm-parallels'      // Parallels (macOS host)
  | 'vm-other'          // Other hypervisor
  | 'wsl1'              // Windows Subsystem for Linux 1
  | 'wsl2'              // Windows Subsystem for Linux 2
  | 'container'         // Docker/Podman container
  | 'lxc'               // LXC/LXD container
  | 'chroot'            // Chroot environment
  | 'live-usb'          // Live USB (non-persistent)
  | 'live-persistent'   // Live USB with persistence
  | 'raspberry-pi'      // Raspberry Pi / ARM SBC
  | 'chromebook'        // Crostini on ChromeOS
  | 'termux'            // Termux on Android
  | 'cloud'             // Cloud VM (AWS, GCP, Azure, etc.)
  | 'vps'               // VPS (DigitalOcean, Linode, etc.)
  | 'dedicated'         // Dedicated server
  | 'unknown';

export type BootMode = 
  | 'uefi'              // UEFI with GPT
  | 'uefi-secure'       // UEFI with Secure Boot enabled
  | 'legacy-bios'       // Legacy BIOS with MBR
  | 'legacy-gpt'        // Legacy BIOS with GPT (unusual)
  | 'coreboot'          // Coreboot firmware
  | 'libreboot'         // Libreboot
  | 'unknown';

export type Bootloader = 
  | 'grub'              // GRUB 2 (most common)
  | 'grub-legacy'       // GRUB Legacy (0.9x)
  | 'systemd-boot'      // systemd-boot / gummiboot
  | 'refind'            // rEFInd (macOS dual-boot)
  | 'syslinux'          // SYSLINUX / ISOLINUX
  | 'lilo'              // LILO (legacy)
  | 'efistub'           // Direct UEFI stub boot
  | 'clover'            // Clover (Hackintosh)
  | 'opencore'          // OpenCore (Hackintosh)
  | 'windows-bootmgr'   // Windows Boot Manager (chainload)
  | 'raspberry-pi'      // Raspberry Pi bootloader
  | 'u-boot'            // U-Boot (embedded/ARM)
  | 'petitboot'         // Petitboot (POWER)
  | 'none'              // Container/chroot (no bootloader)
  | 'unknown';

// ============================================
// Filesystem Types
// ============================================

export type FilesystemType = 
  | 'ext4'              // Most common Linux FS
  | 'ext3'              // Older ext
  | 'ext2'              // Legacy ext
  | 'btrfs'             // Btrfs (snapshots, CoW)
  | 'xfs'               // XFS (RHEL default for large)
  | 'zfs'               // ZFS (Ubuntu, FreeBSD)
  | 'f2fs'              // Flash-Friendly FS (SSDs)
  | 'bcachefs'          // bcachefs (new CoW FS)
  | 'reiserfs'          // ReiserFS (legacy)
  | 'jfs'               // JFS
  | 'nilfs2'            // NILFS2 (log-structured)
  | 'ntfs'              // NTFS (Windows partitions)
  | 'fat32'             // FAT32 (EFI, USB)
  | 'exfat'             // exFAT (large USB)
  | 'vfat'              // VFAT
  | 'hfsplus'           // HFS+ (macOS legacy)
  | 'apfs'              // APFS (modern macOS)
  | 'tmpfs'             // tmpfs (RAM)
  | 'overlay'           // OverlayFS (containers)
  | 'squashfs'          // SquashFS (live images)
  | 'unknown';

// ============================================
// Init System
// ============================================

export type InitSystem = 
  | 'systemd'           // Most modern distros
  | 'sysvinit'          // SysV init (Devuan, older)
  | 'openrc'            // OpenRC (Gentoo, Alpine, Artix)
  | 'runit'             // runit (Void, Artix)
  | 's6'                // s6 (Artix, Obarun)
  | 'dinit'             // dinit (Chimera Linux)
  | 'upstart'           // Upstart (legacy Ubuntu)
  | 'launchd'           // launchd (macOS)
  | 'shepherd'          // GNU Shepherd (Guix)
  | 'busybox-init'      // BusyBox init
  | 'finit'             // finit (embedded)
  | 'unknown';

// ============================================
// Hardware Information
// ============================================

export type GpuVendor = 
  | 'nvidia'            // NVIDIA (proprietary or nouveau)
  | 'amd'               // AMD/ATI (amdgpu, radeon)
  | 'intel'             // Intel integrated (i915)
  | 'nvidia-optimus'    // NVIDIA Optimus (hybrid)
  | 'amd-hybrid'        // AMD hybrid graphics
  | 'intel-nvidia'      // Intel + NVIDIA (laptop)
  | 'intel-amd'         // Intel + AMD (laptop)
  | 'mali'              // ARM Mali
  | 'qualcomm'          // Qualcomm Adreno
  | 'broadcom'          // Broadcom VideoCore (RPi)
  | 'virtualbox'        // VirtualBox virtual GPU
  | 'vmware'            // VMware virtual GPU
  | 'virtio'            // VirtIO GPU (KVM)
  | 'hyperv'            // Hyper-V synthetic
  | 'llvmpipe'          // Software rendering
  | 'unknown';

export type GpuDriverType = 
  | 'proprietary'       // Closed-source (NVIDIA, AMDGPU-PRO)
  | 'open-source'       // Open-source (Mesa, amdgpu, i915)
  | 'nouveau'           // Nouveau (NVIDIA open-source)
  | 'nvidia-open'       // NVIDIA open kernel modules
  | 'radeon'            // Legacy ATI driver
  | 'amdgpu'            // Modern AMD driver
  | 'i915'              // Intel driver
  | 'iris'              // Intel Iris (newer)
  | 'modesetting'       // Generic modesetting
  | 'fbdev'             // Framebuffer
  | 'vesa'              // Generic VESA
  | 'unknown';

export type CpuVendor = 
  | 'intel'             // Intel x86_64
  | 'amd'               // AMD x86_64
  | 'arm'               // ARM (generic)
  | 'arm-apple'         // Apple Silicon
  | 'arm-qualcomm'      // Qualcomm Snapdragon
  | 'arm-broadcom'      // Broadcom (Raspberry Pi)
  | 'arm-rockchip'      // Rockchip
  | 'arm-allwinner'     // Allwinner
  | 'arm-amlogic'       // Amlogic
  | 'arm-samsung'       // Samsung Exynos
  | 'arm-nvidia'        // NVIDIA Tegra
  | 'riscv'             // RISC-V
  | 'loongarch'         // LoongArch
  | 'power'             // IBM POWER
  | 'mips'              // MIPS
  | 'unknown';

export type CpuArchitecture = 
  | 'x86_64'            // 64-bit x86 (amd64)
  | 'i686'              // 32-bit x86
  | 'i386'              // Legacy 32-bit
  | 'aarch64'           // ARM 64-bit
  | 'armv7l'            // ARM 32-bit (v7)
  | 'armhf'             // ARM hard-float
  | 'arm64'             // ARM 64 (alias)
  | 'riscv64'           // RISC-V 64-bit
  | 'ppc64le'           // POWER 64-bit LE
  | 'ppc64'             // POWER 64-bit BE
  | 's390x'             // IBM Z
  | 'mips64'            // MIPS 64-bit
  | 'loongarch64'       // LoongArch 64-bit
  | 'unknown';

export type FormFactor = 
  | 'desktop'           // Desktop PC
  | 'laptop'            // Laptop/Notebook
  | 'ultrabook'         // Thin laptop
  | 'convertible'       // 2-in-1 laptop
  | 'tablet'            // Tablet
  | 'server'            // Server/Rack
  | 'workstation'       // Workstation
  | 'mini-pc'           // Mini PC / NUC
  | 'sbc'               // Single Board Computer (Pi, etc.)
  | 'htpc'              // Home Theater PC
  | 'gaming-pc'         // Gaming PC
  | 'chromebook'        // Chromebook
  | 'phone'             // Phone (Termux/mobile Linux)
  | 'handheld'          // Steam Deck, handhelds
  | 'embedded'          // Embedded system
  | 'vm'                // Virtual machine
  | 'cloud'             // Cloud instance
  | 'unknown';

export interface HardwareInfo {
  gpuVendor: GpuVendor;
  gpuDriver: GpuDriverType;
  cpuVendor: CpuVendor;
  cpuArch: CpuArchitecture;
  formFactor: FormFactor;
  hasTouchscreen: boolean;
  hasSecureBoot: boolean;
  hasTpm: boolean;
  ramGB: number | null;       // RAM in GB
  storageType: 'ssd' | 'hdd' | 'nvme' | 'emmc' | 'mixed' | 'unknown';
}

// ============================================
// Shell Configuration  
// ============================================

export type ShellType = 
  | 'bash'              // Bourne Again Shell (default)
  | 'zsh'               // Z Shell
  | 'fish'              // Friendly Interactive Shell
  | 'dash'              // Debian Almquist Shell (scripts)
  | 'sh'                // POSIX sh
  | 'ksh'               // Korn Shell
  | 'tcsh'              // TENEX C Shell
  | 'csh'               // C Shell
  | 'ash'               // Almquist Shell (BusyBox)
  | 'mksh'              // MirBSD Korn Shell
  | 'elvish'            // Elvish
  | 'nushell'           // Nushell
  | 'xonsh'             // Xonsh (Python)
  | 'oil'               // Oil Shell
  | 'pwsh'              // PowerShell Core
  | 'unknown';

export type TerminalEmulator = 
  | 'gnome-terminal'    // GNOME Terminal
  | 'konsole'           // KDE Konsole
  | 'xfce4-terminal'    // Xfce Terminal
  | 'terminator'        // Terminator
  | 'tilix'             // Tilix
  | 'alacritty'         // Alacritty (GPU)
  | 'kitty'             // Kitty (GPU)
  | 'wezterm'           // WezTerm
  | 'foot'              // Foot (Wayland)
  | 'st'                // st (suckless)
  | 'urxvt'             // rxvt-unicode
  | 'xterm'             // XTerm
  | 'lxterminal'        // LXTerminal
  | 'mate-terminal'     // MATE Terminal
  | 'qterminal'         // QTerminal
  | 'sakura'            // Sakura
  | 'terminology'       // Terminology (Enlightenment)
  | 'cool-retro-term'   // Cool Retro Term
  | 'hyper'             // Hyper
  | 'tabby'             // Tabby (Terminus)
  | 'yakuake'           // Yakuake (KDE drop-down)
  | 'guake'             // Guake (GNOME drop-down)
  | 'tilda'             // Tilda (drop-down)
  | 'zellij'            // Zellij (multiplexer)
  | 'tmux'              // tmux (multiplexer)
  | 'screen'            // GNU Screen
  | 'tty'               // Raw TTY/console
  | 'vscode'            // VS Code integrated
  | 'windows-terminal'  // Windows Terminal (WSL)
  | 'unknown';

// ============================================
// Audio System
// ============================================

export type AudioSystem = 
  | 'pipewire'          // PipeWire (modern, replaces Pulse+JACK)
  | 'pulseaudio'        // PulseAudio
  | 'jack'              // JACK Audio
  | 'alsa'              // ALSA only (no sound server)
  | 'oss'               // Open Sound System (legacy)
  | 'pipewire-pulse'    // PipeWire with PulseAudio compat
  | 'none'              // Headless/no audio
  | 'unknown';

// ============================================
// Networking
// ============================================

export type NetworkManager = 
  | 'networkmanager'    // NetworkManager (most DEs)
  | 'systemd-networkd'  // systemd-networkd
  | 'connman'           // ConnMan
  | 'netplan'           // Netplan (Ubuntu)
  | 'wicd'              // Wicd (legacy)
  | 'ifupdown'          // /etc/network/interfaces
  | 'wicked'            // Wicked (SUSE)
  | 'iwd'               // iNet Wireless Daemon (often with NM)
  | 'dhcpcd'            // dhcpcd standalone
  | 'none'              // Manual/static config
  | 'unknown';

// ============================================
// Firewall
// ============================================

export type FirewallType = 
  | 'firewalld'         // firewalld (Fedora, RHEL)
  | 'ufw'               // Uncomplicated Firewall (Ubuntu)
  | 'iptables'          // iptables direct
  | 'nftables'          // nftables
  | 'pf'                // PF (BSD)
  | 'shorewall'         // Shorewall
  | 'none'              // No firewall
  | 'unknown';

// ============================================
// Container/Virtualization Runtime
// ============================================

export type ContainerRuntime = 
  | 'docker'            // Docker
  | 'podman'            // Podman (daemonless)
  | 'containerd'        // containerd
  | 'lxc'               // LXC
  | 'lxd'               // LXD
  | 'nerdctl'           // nerdctl (containerd CLI)
  | 'cri-o'             // CRI-O (Kubernetes)
  | 'rkt'               // rkt (deprecated)
  | 'singularity'       // Singularity/Apptainer
  | 'systemd-nspawn'    // systemd-nspawn
  | 'none';

// ============================================
// Use Case / Primary Purpose
// ============================================

export type PrimaryUseCase = 
  | 'desktop-general'   // General desktop use
  | 'development'       // Software development
  | 'gaming'            // Gaming
  | 'server'            // Server administration
  | 'devops'            // DevOps/SysAdmin
  | 'data-science'      // Data Science/ML
  | 'creative'          // Creative (audio, video, design)
  | 'security'          // Security research/pentesting
  | 'embedded'          // Embedded/IoT development
  | 'education'         // Learning Linux
  | 'privacy'           // Privacy-focused
  | 'media-server'      // Media server (Plex, etc.)
  | 'home-automation'   // Home automation
  | 'office'            // Office/productivity
  | 'other';

// ============================================
// Preferred Editors
// ============================================

export type CodeEditor = 
  | 'vscode'            // Visual Studio Code
  | 'vscodium'          // VSCodium
  | 'neovim'            // Neovim
  | 'vim'               // Vim
  | 'emacs'             // GNU Emacs
  | 'nano'              // GNU Nano
  | 'helix'             // Helix
  | 'kate'              // Kate (KDE)
  | 'gedit'             // gedit (GNOME)
  | 'sublime'           // Sublime Text
  | 'atom'              // Atom (sunset)
  | 'intellij'          // IntelliJ IDEA
  | 'pycharm'           // PyCharm
  | 'jetbrains'         // JetBrains generic
  | 'eclipse'           // Eclipse
  | 'geany'             // Geany
  | 'micro'             // micro
  | 'kakoune'           // Kakoune
  | 'zed'               // Zed
  | 'lapce'             // Lapce
  | 'other';

// ============================================
// Main User State Interface (Comprehensive)
// ============================================

export interface LinuxUserState {
  // === DISTRIBUTION ===
  distro: string;                     // e.g., "Ubuntu", "Fedora", "Arch"
  distroVersion: string;              // e.g., "22.04", "39", "rolling"
  distroCodename: string;             // e.g., "jammy", "noble", "bookworm"
  distroBase: DistroBase;
  releaseType: 'stable' | 'lts' | 'rolling' | 'testing' | 'unstable' | 'unknown';
  
  // === PACKAGE MANAGEMENT ===
  packageManager: PackageManager;
  secondaryPackageManagers: SecondaryPackageManager[];
  aurHelper: PackageManager | null;   // For Arch-based: yay, paru, etc.
  
  // === DESKTOP ENVIRONMENT ===
  desktop: DesktopEnvironment;
  displayServer: DisplayServer;
  displayManager: DisplayManager;
  
  // === SYSTEM ===
  initSystem: InitSystem;
  filesystem: FilesystemType;
  
  // === BOOT ===
  bootType: BootType;
  bootMode: BootMode;
  bootloader: Bootloader;
  
  // === HARDWARE ===
  hardware: HardwareInfo;
  
  // === SHELL & TERMINAL ===
  shell: ShellType;
  terminal: TerminalEmulator;
  
  // === AUDIO & NETWORK ===
  audioSystem: AudioSystem;
  networkManager: NetworkManager;
  firewall: FirewallType;
  
  // === CONTAINERS ===
  containerRuntime: ContainerRuntime;
  
  // === USER PREFERENCES ===
  experienceLevel: ExperienceLevel;
  primaryUseCase: PrimaryUseCase;
  preferredEditors: CodeEditor[];
  
  // === METADATA ===
  createdAt: number;
  updatedAt: number;
}

// ============================================
// Default State Factory
// ============================================

export function createDefaultState(): LinuxUserState {
  const now = Date.now();
  return {
    // Distribution
    distro: 'unknown',
    distroVersion: 'unknown',
    distroCodename: 'unknown',
    distroBase: 'unknown',
    releaseType: 'unknown',
    
    // Package Management
    packageManager: 'unknown',
    secondaryPackageManagers: [],
    aurHelper: null,
    
    // Desktop
    desktop: 'unknown',
    displayServer: 'unknown',
    displayManager: 'unknown',
    
    // System
    initSystem: 'unknown',
    filesystem: 'unknown',
    
    // Boot
    bootType: 'unknown',
    bootMode: 'unknown',
    bootloader: 'unknown',
    
    // Hardware
    hardware: {
      gpuVendor: 'unknown',
      gpuDriver: 'unknown',
      cpuVendor: 'unknown',
      cpuArch: 'unknown',
      formFactor: 'unknown',
      hasTouchscreen: false,
      hasSecureBoot: false,
      hasTpm: false,
      ramGB: null,
      storageType: 'unknown',
    },
    
    // Shell & Terminal
    shell: 'unknown',
    terminal: 'unknown',
    
    // Audio & Network
    audioSystem: 'unknown',
    networkManager: 'unknown',
    firewall: 'unknown',
    
    // Containers
    containerRuntime: 'none',
    
    // User Preferences
    experienceLevel: 'beginner', // Default to beginner for safety
    primaryUseCase: 'desktop-general',
    preferredEditors: [],
    
    // Metadata
    createdAt: now,
    updatedAt: now,
  };
}

// ============================================
// State Update Helper
// ============================================

export type PartialLinuxUserState = Partial<Omit<LinuxUserState, 'createdAt' | 'updatedAt'>>;

export function mergeState(
  current: LinuxUserState, 
  updates: PartialLinuxUserState
): LinuxUserState {
  return {
    ...current,
    ...updates,
    hardware: {
      ...current.hardware,
      ...(updates.hardware || {}),
    },
    secondaryPackageManagers: updates.secondaryPackageManagers ?? current.secondaryPackageManagers,
    preferredEditors: updates.preferredEditors ?? current.preferredEditors,
    updatedAt: Date.now(),
  };
}

// ============================================
// Distro to Package Manager Mapping (Comprehensive)
// ============================================

export const DISTRO_PACKAGE_MANAGER_MAP: Record<string, PackageManager> = {
  // === DEBIAN FAMILY ===
  'debian': 'apt',
  'ubuntu': 'apt',
  'linux mint': 'apt',
  'mint': 'apt',
  'lmde': 'apt',                    // Linux Mint Debian Edition
  'pop!_os': 'apt',
  'pop os': 'apt',
  'popos': 'apt',
  'pop': 'apt',
  'elementary': 'apt',
  'elementary os': 'apt',
  'zorin': 'apt',
  'zorin os': 'apt',
  'kali': 'apt',
  'kali linux': 'apt',
  'parrot': 'apt',
  'parrot os': 'apt',
  'mx': 'apt',
  'mx linux': 'apt',
  'antiX': 'apt',
  'antix': 'apt',
  'deepin': 'apt',
  'devuan': 'apt',
  'bunsenlabs': 'apt',
  'crunchbang': 'apt',
  'crunchbangplusplus': 'apt',
  'sparky': 'apt',
  'sparkylinux': 'apt',
  'peppermint': 'apt',
  'bodhi': 'apt',
  'bodhi linux': 'apt',
  'q4os': 'apt',
  'knoppix': 'apt',
  'tails': 'apt',
  'pureos': 'apt',
  'pure os': 'apt',
  'raspberry pi os': 'apt',
  'raspbian': 'apt',
  'armbian': 'apt',
  'dietpi': 'apt',
  'proxmox': 'apt',
  'openmediavault': 'apt',
  'turnkey': 'apt',
  'ubuntu server': 'apt',
  'kubuntu': 'apt',
  'xubuntu': 'apt',
  'lubuntu': 'apt',
  'ubuntu mate': 'apt',
  'ubuntu budgie': 'apt',
  'ubuntu studio': 'apt',
  'ubuntu unity': 'apt',
  'ubuntu cinnamon': 'apt',
  'ubuntu kylin': 'apt',
  'edubuntu': 'apt',
  'mythbuntu': 'apt',
  'neon': 'apt',
  'kde neon': 'apt',
  'linuxfx': 'apt',
  'windowsfx': 'apt',
  'voyager': 'apt',
  'regolith': 'apt',
  'drauger': 'apt',
  'drauger os': 'apt',
  'feren': 'apt',
  'feren os': 'apt',
  'nitrux': 'apt',
  'cutefishos': 'apt',
  'cutefish os': 'apt',
  'spiral': 'apt',
  'spiral linux': 'apt',
  
  // === RHEL/FEDORA FAMILY ===
  'fedora': 'dnf',
  'fedora server': 'dnf',
  'fedora workstation': 'dnf',
  'fedora kde': 'dnf',
  'fedora xfce': 'dnf',
  'fedora lxqt': 'dnf',
  'fedora cinnamon': 'dnf',
  'fedora mate': 'dnf',
  'fedora i3': 'dnf',
  'fedora sway': 'dnf',
  'fedora sericea': 'dnf',
  'fedora kinoite': 'dnf',
  'fedora silverblue': 'rpm-ostree',
  'silverblue': 'rpm-ostree',
  'kinoite': 'rpm-ostree',
  'fedora coreos': 'rpm-ostree',
  'fedora iot': 'rpm-ostree',
  'rhel': 'dnf',
  'red hat': 'dnf',
  'red hat enterprise linux': 'dnf',
  'centos': 'dnf',
  'centos stream': 'dnf',
  'rocky': 'dnf',
  'rocky linux': 'dnf',
  'alma': 'dnf',
  'almalinux': 'dnf',
  'oracle': 'dnf',
  'oracle linux': 'dnf',
  'scientific': 'dnf',
  'scientific linux': 'dnf',
  'springdale': 'dnf',
  'eurolinux': 'dnf',
  'navy linux': 'dnf',
  'amazon linux': 'dnf',
  'amazon': 'dnf',
  'nobara': 'dnf',
  'ultramarine': 'dnf',
  'ultramarine linux': 'dnf',
  'risi': 'dnf',
  'risios': 'dnf',
  'qubes': 'dnf',
  'qubes os': 'dnf',
  'mageia': 'urpmi',
  'openmandriva': 'dnf',
  'pclinuxos': 'apt',             // Uses apt-rpm
  'rosa': 'urpmi',
  'clearos': 'dnf',
  
  // === ARCH FAMILY ===
  'arch': 'pacman',
  'arch linux': 'pacman',
  'archlinux': 'pacman',
  'manjaro': 'pacman',
  'endeavouros': 'pacman',
  'endeavour': 'pacman',
  'garuda': 'pacman',
  'garuda linux': 'pacman',
  'arcolinux': 'pacman',
  'arco': 'pacman',
  'artix': 'pacman',
  'artix linux': 'pacman',
  'parabola': 'pacman',
  'hyperbola': 'pacman',
  'archcraft': 'pacman',
  'rebornos': 'pacman',
  'reborn os': 'pacman',
  'archbang': 'pacman',
  'bluestar': 'pacman',
  'bluestar linux': 'pacman',
  'chakra': 'pacman',
  'ctlos': 'pacman',
  'kaos': 'pacman',
  'xerolinux': 'pacman',
  'xero': 'pacman',
  'mabox': 'pacman',
  'archman': 'pacman',
  'peux os': 'pacman',
  'snal': 'pacman',
  'crystal linux': 'pacman',
  'instantos': 'pacman',
  'steamos': 'pacman',
  'steam os': 'pacman',
  'steamdeck': 'pacman',
  'steam deck': 'pacman',
  'cachyos': 'pacman',
  'cachy': 'pacman',
  'athena os': 'pacman',
  'athena': 'pacman',
  
  // === SUSE FAMILY ===
  'opensuse': 'zypper',
  'suse': 'zypper',
  'opensuse tumbleweed': 'zypper',
  'tumbleweed': 'zypper',
  'opensuse leap': 'zypper',
  'leap': 'zypper',
  'opensuse microos': 'transactional-update',
  'microos': 'transactional-update',
  'sles': 'zypper',
  'suse linux enterprise': 'zypper',
  'geckolinux': 'zypper',
  'gecko linux': 'zypper',
  'kamarada': 'zypper',
  'regata os': 'zypper',
  
  // === GENTOO FAMILY ===
  'gentoo': 'emerge',
  'funtoo': 'emerge',
  'calculate': 'emerge',
  'calculate linux': 'emerge',
  'sabayon': 'equo',              // Now MocaccinoOS
  'mocaccino': 'emerge',
  'mocaccinoos': 'emerge',
  'redcore': 'emerge',
  'pentoo': 'emerge',
  
  // === SLACKWARE FAMILY ===
  'slackware': 'slackpkg',
  'salix': 'slapt-get',
  'slackel': 'slapt-get',
  'zenwalk': 'slapt-get',
  'porteus': 'slackpkg',
  'absolute': 'slapt-get',
  'slax': 'slackpkg',
  
  // === INDEPENDENT DISTROS ===
  'void': 'xbps',
  'void linux': 'xbps',
  'alpine': 'apk',
  'alpine linux': 'apk',
  'postmarket': 'apk',
  'postmarketos': 'apk',
  'nixos': 'nix',
  'nix': 'nix',
  'guix': 'guix',
  'gnu guix': 'guix',
  'solus': 'eopkg',
  'clear': 'swupd',
  'clear linux': 'swupd',
  'clearlinux': 'swupd',
  'puppy': 'petget',
  'puppy linux': 'petget',
  'tinycore': 'tce-load',
  'tiny core': 'tce-load',
  'slitaz': 'tazpkg',
  '4mlinux': 'unknown',
  'kwort': 'kpkg',
  'nutyx': 'cards',
  'crux': 'prt-get',
  'kiss': 'kiss',
  'kiss linux': 'kiss',
  'oasis': 'unknown',
  'chimera': 'apk',
  'chimera linux': 'apk',
  'adelie': 'apk',
  'adelie linux': 'apk',
  
  // === IMMUTABLE DISTROS ===
  'vanilla': 'abroot',
  'vanilla os': 'abroot',
  'blendos': 'blend',
  'carbonos': 'unknown',
  'endless': 'flatpak',
  'endless os': 'flatpak',
  
  // === SPECIAL PURPOSE ===
  'chromeos': 'unknown',
  'chrome os': 'unknown',
  'chromeos flex': 'unknown',
  'android': 'unknown',
  'termux': 'apt',               // Uses apt in Termux
  'wsl': 'apt',                  // Default WSL is Ubuntu
  'wsl2': 'apt',
};

// ============================================
// Distro to Base Family Mapping (Comprehensive)
// ============================================

export const DISTRO_BASE_MAP: Record<string, DistroBase> = {
  // === DEBIAN FAMILY ===
  'debian': 'debian',
  'ubuntu': 'ubuntu',
  'linux mint': 'ubuntu',
  'mint': 'ubuntu',
  'lmde': 'debian',
  'pop!_os': 'ubuntu',
  'pop os': 'ubuntu',
  'popos': 'ubuntu',
  'pop': 'ubuntu',
  'elementary': 'ubuntu',
  'elementary os': 'ubuntu',
  'zorin': 'ubuntu',
  'zorin os': 'ubuntu',
  'kali': 'debian',
  'kali linux': 'debian',
  'parrot': 'debian',
  'parrot os': 'debian',
  'mx': 'debian',
  'mx linux': 'debian',
  'antix': 'debian',
  'deepin': 'debian',
  'devuan': 'debian',
  'sparky': 'debian',
  'sparkylinux': 'debian',
  'peppermint': 'debian',
  'bodhi': 'ubuntu',
  'q4os': 'debian',
  'knoppix': 'debian',
  'tails': 'debian',
  'pureos': 'debian',
  'raspberry pi os': 'debian',
  'raspbian': 'debian',
  'armbian': 'debian',
  'dietpi': 'debian',
  'proxmox': 'debian',
  'kubuntu': 'ubuntu',
  'xubuntu': 'ubuntu',
  'lubuntu': 'ubuntu',
  'ubuntu mate': 'ubuntu',
  'ubuntu budgie': 'ubuntu',
  'ubuntu studio': 'ubuntu',
  'ubuntu unity': 'ubuntu',
  'neon': 'ubuntu',
  'kde neon': 'ubuntu',
  'regolith': 'ubuntu',
  'feren': 'ubuntu',
  'feren os': 'ubuntu',
  'nitrux': 'ubuntu',
  'spiral': 'debian',
  'spiral linux': 'debian',
  
  // === FEDORA/RHEL FAMILY ===
  'fedora': 'fedora',
  'fedora workstation': 'fedora',
  'fedora server': 'fedora',
  'fedora silverblue': 'immutable',
  'silverblue': 'immutable',
  'fedora kinoite': 'immutable',
  'kinoite': 'immutable',
  'rhel': 'rhel',
  'red hat': 'rhel',
  'red hat enterprise linux': 'rhel',
  'centos': 'rhel',
  'centos stream': 'rhel',
  'rocky': 'rhel',
  'rocky linux': 'rhel',
  'alma': 'rhel',
  'almalinux': 'rhel',
  'oracle': 'rhel',
  'oracle linux': 'rhel',
  'scientific': 'rhel',
  'amazon linux': 'rhel',
  'nobara': 'fedora',
  'ultramarine': 'fedora',
  'qubes': 'fedora',
  'qubes os': 'fedora',
  'mageia': 'mageia',
  'openmandriva': 'fedora',
  
  // === ARCH FAMILY ===
  'arch': 'arch',
  'arch linux': 'arch',
  'archlinux': 'arch',
  'manjaro': 'arch',
  'endeavouros': 'arch',
  'endeavour': 'arch',
  'garuda': 'arch',
  'garuda linux': 'arch',
  'arcolinux': 'arch',
  'arco': 'arch',
  'artix': 'arch',
  'artix linux': 'arch',
  'parabola': 'arch',
  'hyperbola': 'arch',
  'archcraft': 'arch',
  'rebornos': 'arch',
  'cachyos': 'arch',
  'xerolinux': 'arch',
  'steamos': 'steamdeck',
  'steam os': 'steamdeck',
  'steamdeck': 'steamdeck',
  'steam deck': 'steamdeck',
  
  // === SUSE FAMILY ===
  'opensuse': 'suse',
  'suse': 'suse',
  'opensuse tumbleweed': 'suse',
  'tumbleweed': 'suse',
  'opensuse leap': 'suse',
  'leap': 'suse',
  'opensuse microos': 'immutable',
  'microos': 'immutable',
  'sles': 'suse',
  'geckolinux': 'suse',
  
  // === GENTOO FAMILY ===
  'gentoo': 'gentoo',
  'funtoo': 'gentoo',
  'calculate': 'gentoo',
  'calculate linux': 'gentoo',
  'sabayon': 'gentoo',
  'mocaccino': 'gentoo',
  'redcore': 'gentoo',
  'pentoo': 'gentoo',
  
  // === SLACKWARE FAMILY ===
  'slackware': 'slackware',
  'salix': 'slackware',
  'slackel': 'slackware',
  'zenwalk': 'slackware',
  'porteus': 'slackware',
  'slax': 'slackware',
  
  // === INDEPENDENT ===
  'void': 'void',
  'void linux': 'void',
  'alpine': 'alpine',
  'alpine linux': 'alpine',
  'postmarketos': 'alpine',
  'nixos': 'nixos',
  'nix': 'nixos',
  'guix': 'guix',
  'gnu guix': 'guix',
  'solus': 'solus',
  'clear': 'clear',
  'clear linux': 'clear',
  'puppy': 'puppy',
  'puppy linux': 'puppy',
  'tinycore': 'tinycore',
  'chimera': 'alpine',
  'chimera linux': 'alpine',
  
  // === IMMUTABLE ===
  'vanilla': 'immutable',
  'vanilla os': 'immutable',
  'blendos': 'immutable',
  'endless': 'immutable',
  'endless os': 'immutable',
  
  // === SPECIAL ===
  'chromeos': 'chromeos',
  'chrome os': 'chromeos',
  'android': 'android',
  'termux': 'android',
};

// ============================================
// Distro to Init System Mapping
// ============================================

export const DISTRO_INIT_MAP: Record<string, InitSystem> = {
  // systemd (most modern distros)
  'ubuntu': 'systemd',
  'debian': 'systemd',
  'fedora': 'systemd',
  'arch': 'systemd',
  'manjaro': 'systemd',
  'opensuse': 'systemd',
  'rhel': 'systemd',
  'centos': 'systemd',
  'mint': 'systemd',
  'pop os': 'systemd',
  'elementary': 'systemd',
  'zorin': 'systemd',
  'kali': 'systemd',
  'mx linux': 'systemd',
  'endeavouros': 'systemd',
  'garuda': 'systemd',
  'solus': 'systemd',
  
  // OpenRC
  'gentoo': 'openrc',
  'alpine': 'openrc',
  'artix': 'openrc',       // Can also use runit, s6, dinit
  'calculate': 'openrc',
  'postmarketos': 'openrc',
  
  // runit
  'void': 'runit',
  'void linux': 'runit',
  
  // SysVinit
  'devuan': 'sysvinit',
  'antix': 'sysvinit',
  'slackware': 'sysvinit',
  
  // Shepherd
  'guix': 'shepherd',
  'gnu guix': 'shepherd',
  
  // Special
  'nixos': 'systemd',
  'chromeos': 'upstart',
};

// ============================================
// Distro Default Desktop Mapping
// ============================================

export const DISTRO_DEFAULT_DESKTOP_MAP: Record<string, DesktopEnvironment> = {
  'ubuntu': 'gnome',
  'fedora': 'gnome',
  'fedora workstation': 'gnome',
  'pop os': 'gnome',           // Will be COSMIC in future
  'pop!_os': 'gnome',
  'debian': 'gnome',
  'rhel': 'gnome',
  'centos': 'gnome',
  'rocky': 'gnome',
  'alma': 'gnome',
  'elementary': 'pantheon',
  'elementary os': 'pantheon',
  'linux mint': 'cinnamon',
  'mint': 'cinnamon',
  'zorin': 'gnome',
  'kubuntu': 'kde',
  'kde neon': 'kde',
  'fedora kde': 'kde',
  'opensuse': 'kde',
  'manjaro': 'xfce',           // Default, but has KDE/GNOME editions
  'xubuntu': 'xfce',
  'mx linux': 'xfce',
  'lubuntu': 'lxqt',
  'lxle': 'lxde',
  'solus': 'budgie',
  'ubuntu budgie': 'budgie',
  'ubuntu mate': 'mate',
  'deepin': 'deepin',
  'ubuntu cinnamon': 'cinnamon',
  'garuda': 'kde',             // Default Dr460nized edition
  'endeavouros': 'xfce',       // Default offline install
  'archcraft': 'openbox',
  'arcolinux': 'xfce',
  'regolith': 'i3',
  'mabox': 'openbox',
};

// ============================================
// Lookup Helpers
// ============================================

export function getPackageManagerForDistro(distro: string): PackageManager {
  const normalized = distro.toLowerCase().trim();
  return DISTRO_PACKAGE_MANAGER_MAP[normalized] || 'unknown';
}

export function getDistroBase(distro: string): DistroBase {
  const normalized = distro.toLowerCase().trim();
  return DISTRO_BASE_MAP[normalized] || 'unknown';
}

export function getInitSystem(distro: string): InitSystem {
  const normalized = distro.toLowerCase().trim();
  return DISTRO_INIT_MAP[normalized] || 'unknown';
}

export function getDefaultDesktop(distro: string): DesktopEnvironment {
  const normalized = distro.toLowerCase().trim();
  return DISTRO_DEFAULT_DESKTOP_MAP[normalized] || 'unknown';
}

// ============================================
// Auto-fill State from Distro Name
// ============================================

export function inferStateFromDistro(distro: string): PartialLinuxUserState {
  const normalized = distro.toLowerCase().trim();
  return {
    distro: distro,
    distroBase: getDistroBase(normalized),
    packageManager: getPackageManagerForDistro(normalized),
    initSystem: getInitSystem(normalized),
    desktop: getDefaultDesktop(normalized),
  };
}

// ============================================
// State Display Helpers
// ============================================

export function formatStateForDisplay(state: LinuxUserState): string {
  const parts: string[] = [];
  
  // Distribution
  if (state.distro !== 'unknown') {
    let distroStr = state.distro;
    if (state.distroVersion !== 'unknown') distroStr += ` ${state.distroVersion}`;
    if (state.distroCodename !== 'unknown') distroStr += ` (${state.distroCodename})`;
    parts.push(`🐧 **Distro:** ${distroStr}`);
  }
  
  // Package Manager
  if (state.packageManager !== 'unknown') {
    let pmStr = state.packageManager;
    if (state.secondaryPackageManagers.length > 0) {
      pmStr += ` + ${state.secondaryPackageManagers.join(', ')}`;
    }
    parts.push(`📦 **Package Manager:** ${pmStr}`);
  }
  
  // Desktop & Display
  if (state.desktop !== 'unknown') {
    let deStr = state.desktop.toUpperCase();
    if (state.displayServer !== 'unknown') deStr += ` (${state.displayServer})`;
    parts.push(`🖥️ **Desktop:** ${deStr}`);
  }
  
  // Boot Configuration
  if (state.bootType !== 'unknown') {
    let bootStr = state.bootType;
    if (state.bootMode !== 'unknown') bootStr += ` / ${state.bootMode}`;
    parts.push(`🔌 **Boot:** ${bootStr}`);
  }
  
  // Hardware
  if (state.hardware.gpuVendor !== 'unknown') {
    let hwStr = `GPU: ${state.hardware.gpuVendor.toUpperCase()}`;
    if (state.hardware.cpuVendor !== 'unknown') {
      hwStr += `, CPU: ${state.hardware.cpuVendor.toUpperCase()}`;
    }
    if (state.hardware.formFactor !== 'unknown') {
      hwStr += ` (${state.hardware.formFactor})`;
    }
    parts.push(`🔧 **Hardware:** ${hwStr}`);
  }
  
  // Shell
  if (state.shell !== 'unknown') {
    parts.push(`💻 **Shell:** ${state.shell}`);
  }
  
  // Init System  
  if (state.initSystem !== 'unknown') {
    parts.push(`⚙️ **Init:** ${state.initSystem}`);
  }
  
  // Experience & Use Case
  parts.push(`📊 **Level:** ${state.experienceLevel}`);
  if (state.primaryUseCase !== 'desktop-general') {
    parts.push(`🎯 **Use:** ${state.primaryUseCase}`);
  }
  
  return parts.length > 0 ? parts.join('\n') : 'No profile set yet. Tell me about your Linux setup!';
}

// ============================================
// Compact State Display (for chat header)
// ============================================

export function formatStateCompact(state: LinuxUserState): string {
  const parts: string[] = [];
  
  if (state.distro !== 'unknown') {
    parts.push(state.distro + (state.distroVersion !== 'unknown' ? ` ${state.distroVersion}` : ''));
  }
  if (state.packageManager !== 'unknown') {
    parts.push(state.packageManager);
  }
  if (state.desktop !== 'unknown' && state.desktop !== 'none') {
    parts.push(state.desktop);
  }
  if (state.hardware.gpuVendor !== 'unknown') {
    parts.push(state.hardware.gpuVendor);
  }
  parts.push(state.experienceLevel);
  
  return parts.length > 0 ? parts.join(' • ') : 'Profile not set';
}

// ============================================
// State Summary for AI Context
// ============================================

export function formatStateForAI(state: LinuxUserState): string {
  const lines: string[] = ['User\'s Linux System Context:'];
  
  if (state.distro !== 'unknown') {
    lines.push(`- Distribution: ${state.distro} ${state.distroVersion !== 'unknown' ? state.distroVersion : ''} (${state.distroBase} family)`);
  }
  if (state.packageManager !== 'unknown') {
    lines.push(`- Package Manager: ${state.packageManager}${state.aurHelper ? ` with AUR helper: ${state.aurHelper}` : ''}`);
  }
  if (state.secondaryPackageManagers.length > 0) {
    lines.push(`- Also uses: ${state.secondaryPackageManagers.join(', ')}`);
  }
  if (state.desktop !== 'unknown') {
    lines.push(`- Desktop: ${state.desktop} on ${state.displayServer !== 'unknown' ? state.displayServer : 'unknown display server'}`);
  }
  if (state.initSystem !== 'unknown') {
    lines.push(`- Init System: ${state.initSystem}`);
  }
  if (state.bootType !== 'unknown') {
    lines.push(`- Boot Type: ${state.bootType}${state.bootMode !== 'unknown' ? ` (${state.bootMode})` : ''}`);
  }
  if (state.hardware.gpuVendor !== 'unknown') {
    lines.push(`- GPU: ${state.hardware.gpuVendor}${state.hardware.gpuDriver !== 'unknown' ? ` (${state.hardware.gpuDriver} driver)` : ''}`);
  }
  if (state.hardware.cpuVendor !== 'unknown') {
    lines.push(`- CPU: ${state.hardware.cpuVendor} ${state.hardware.cpuArch !== 'unknown' ? state.hardware.cpuArch : ''}`);
  }
  if (state.hardware.formFactor !== 'unknown') {
    lines.push(`- Form Factor: ${state.hardware.formFactor}${state.hardware.hasTouchscreen ? ' with touchscreen' : ''}`);
  }
  if (state.shell !== 'unknown') {
    lines.push(`- Shell: ${state.shell}${state.terminal !== 'unknown' ? ` in ${state.terminal}` : ''}`);
  }
  if (state.audioSystem !== 'unknown') {
    lines.push(`- Audio: ${state.audioSystem}`);
  }
  if (state.containerRuntime !== 'none') {
    lines.push(`- Containers: ${state.containerRuntime}`);
  }
  lines.push(`- Experience Level: ${state.experienceLevel}`);
  lines.push(`- Primary Use Case: ${state.primaryUseCase}`);
  if (state.preferredEditors.length > 0) {
    lines.push(`- Preferred Editors: ${state.preferredEditors.join(', ')}`);
  }
  
  return lines.join('\n');
}
