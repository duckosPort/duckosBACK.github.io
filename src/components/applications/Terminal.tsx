import React, { useState, useRef, useEffect } from 'react';
import Window from '../os/Window';

export interface TerminalProps extends WindowAppProps {
    openGui?: () => void;
}

const DUCKOS_ASCII = `                                  ____             __   ____  _____
                                 / __ \\__  _______/ /__/ __ \\/ ___/
                                / / / / / / / ___/ //_/ / / /\\__ \\
                               / /_/ / /_/ / /__/ ,< / /_/ /___/ /
                              /_____/\\__,_/\\___/_/|_|\\____//____/
`;

const DUCK_ASCII = `
          ⠀⠀⠀ ⠀       ⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⡀⠀
    ⠀⠀⠀⠀⠀            ⠀⣴⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣷
    ⠀⠀⠀⠀⠀            ⢸⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿
    ⠀⠀⠀⠀             ⣾⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣀⠀⠀⢠⣿⣿⣿⡇
    ⠀⠀⠀⠀            ⢀⣿⣿⣿⡏⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⡿⠟⠛⠻⠿⢿⣿⣿⣿⡇⠀⣸⣿⣿⣿⠃
    ⠀⠀⠀            ⠀⢸⣿⣿⣿⠇⣸⣿⣷⣦⣤⣤⣤⣤⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡿⠀
    ⠀⠀      ⠀      ⠀⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⡇⠀
    ⠀    ⠀        ⠀⢰⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠁⠀
        ⠀        ⢠⣾⣿⣿⣿⡏⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣷⡄
    ⠀            ⠀⠈⣿⣿⣿⡇⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⢰⣿⣿⣿⡟⠁⠀
                ⠀⠀⢸⣿⣿⣿⡇⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⣾⣿⣿⣿⠀⠀⠀
        ⠀        ⠀⣼⣿⣿⣿⠁⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⢀⣿⣿⣿⡏⠀⠀⠀
          ⠀      ⠀⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠇⠀⠀⠀
                ⠀⢸⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⠿⠿⠿⠿⠿⣿⣿⣿⣟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀⠀
                ⠀⣾⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣧⣀⠀⣠⣶⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⡇⠀⠀⠀⠀
                ⠀⣿⣿⣿⣿⣶⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⡿⣿⣿⠿⠿⣿⡧⠀⠀⠀⠀⣴⣶⣿⣿⣿⣿⠁⠀⠀⠀⠀
               ⠀⠈⠛⠛⠛⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⡿⠿⢿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠛⠛⠛⠋⠁⠀⠀⠀⠀⠀

`;

interface TerminalLine {
    type: 'command' | 'output';
    content: string;
}

const Terminal: React.FC<TerminalProps> = (props) => {
    const [history, setHistory] = useState<TerminalLine[]>([
        { type: 'output', content: DUCKOS_ASCII },
        { type: 'output', content: DUCK_ASCII },
        { type: 'output', content: '' },
        {
            type: 'output',
            content: 'Welcome to DuckOS! Type "help" for a list of commands.',
        },
        { type: 'output', content: '' },
    ]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const addOutput = (lines: string[]) => {
        setHistory((prev) => [
            ...prev,
            ...lines.map((line) => ({
                type: 'output' as const,
                content: line,
            })),
            { type: 'output', content: '\u00A0' },
        ]);
    };

    const executeCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        const [command, ...args] = trimmedCmd.split(' ');
        const lowerCmd = command.toLowerCase();

        setHistory((prev) => [
            ...prev,
            { type: 'command', content: `guest@nandobez.github.io:~$ ${cmd}` },
        ]);

        if (!trimmedCmd) {
            return;
        }

        let output: string[] = [];

        switch (lowerCmd) {
            case 'help':
                output = [
                    'about            - about Fernando Bezerra',
                    'clear            - clear the terminal',
                    'contact          - show contact information',
                    'echo <text>      - print text to terminal',
                    'education        - my education background',
                    'email            - send me an email',
                    'gui              - open the portfolio GUI',
                    'help             - check available commands',
                    'history          - view command history',
                    "projects         - view projects that I've coded",
                    'pwd              - print current working directory',
                    'shortcuts        - show keyboard shortcuts',
                    'skills           - show my technical skills',
                    'socials          - check out my social accounts',
                    'time             - show current time',
                    'welcome          - display the welcome message',
                    'whoami           - about current user',
                ];
                break;

            case 'about':
                output = [
                    'Fernando Bezerra',
                    '',
                    'Full Stack Developer and Computer Science student at UNIFOR.',
                    '',
                    "I'm passionate about creating amazing web experiences and working",
                    'with modern technologies. My focus is on building projects that',
                    'make a difference.',
                    '',
                    'Location: Fortaleza, CE - Brazil',
                    'Interests: Web Development, Game Development, IoT, Coffee',
                    '',
                    'Type "education" to see my background',
                    'Type "skills" to see my technical skills',
                    'Type "projects" to see my work',
                ];
                break;

            case 'education':
                output = [
                    'Education:',
                    '',
                    '🎓 UNIFOR - Universidade de Fortaleza',
                    '   Computer Science',
                    '   2020 - Present',
                    '',
                    'Relevant coursework: Algorithms, Data Structures,',
                    'Software Engineering, Database Systems, Web Development',
                ];
                break;

            case 'skills':
                output = [
                    'Technical Skills:',
                    '',
                    'Languages: Java, Python, C/C++, JavaScript/TypeScript, R',
                    '',
                    'Frontend: React, Next.js, Angular, Three.js, HTML5, CSS3, TailwindCSS',
                    '',
                    'Backend: Node.js, Express, SpringBoot, Spring Security, REST APIs, FastAPI',
                    '',
                    'Databases: PostgreSQL, MongoDB, MySQL',
                    '',
                    'DevOps & Tools: Git, GitHub, Docker, RabbitMQ, N8N, Ollama, Burn, LaTeX, Swagger, Shotgun',
                    '',
                    'Data Science & ML: PyTorch, TensorFlow, Scikit-Learn, Pandas, Matplotlib, Seaborn, Plotly/Dash',
                    '',
                    'Other: Linux, IoT, Arduino, PCB Design, 3D Printing, CNC Cutting, SOLID, Clean Code',
                ];
                break;

            case 'projects':
                output = [
                    'Projects:',
                    '',
                    '1. Tone Key Reader',
                    '   A Python script that uses the Spotify API to get the key of a song.',
                    '   Technologies: Python, Spotify API',
                    '',
                    '2. Flappy Bird ML',
                    '   A machine learning project where a neural network learns to play Flappy Bird.',
                    '   Technologies: Python, NEAT',
                    '',
                    '3. Chat Server in C',
                    '   A simple chat server implemented in C.',
                    '   Technologies: C, Sockets',
                    '',
                    '4. Gemini CLI Chat',
                    '   A command-line interface for interacting with the Gemini API.',
                    '   Technologies: Go',
                    '',
                    '5. Paint App for ESP32',
                    '   A simple paint application for the ESP32 with a CYD.',
                    '   Technologies: C++, Arduino',
                    '',
                    '6. YT Song Downloader',
                    '   A Python script to download songs from YouTube.',
                    '   Technologies: Python',
                    '',
                    '7. Polaroide',
                    '   A personal website created as a gift for my girlfriend.',
                    '   Technologies: React, TypeScript',
                    '',
                    '8. Sérgio Magalhães Author Website',
                    '   A promotional website created for my father\'s books.',
                    '   Technologies: HTML, CSS, JavaScript',
                    '',
                    'Check out my GitHub for more: github.com/Nandobez',
                ];
                break;

            case 'whoami':
                output = [
                    'guest',
                    '',
                    "You are currently exploring Fernando Bezerra's portfolio",
                    'Type "about" to learn more about me',
                ];
                break;

            case 'socials':
                output = [
                    'Social Media:',
                    '',
                    '  GitHub:    github.com/Nandobez',
                    '  LinkedIn:  linkedin.com/in/fernando-bezerra',
                    '  WhatsApp:  +55 85 99740-4346',
                    '  Email:     fernando.devsolutions13@gmail.com',
                ];
                break;

            case 'contact':
                output = [
                    'Contact Information:',
                    '',
                    '  Email:     fernando.devsolutions13@gmail.com',
                    '  GitHub:    github.com/Nandobez',
                    '  WhatsApp:  +55 85 99740-4346',
                    '',
                    "Feel free to reach out! I'm always open to new opportunities",
                    'and collaborations.',
                ];
                break;

            case 'email':
                output = ['Opening email client...'];
                setTimeout(() => {
                    window.location.href =
                        'mailto:fernando.devsolutions13@gmail.com';
                }, 500);
                break;

            case 'pwd':
                output = ['~/root/guest/'];
                break;

            case 'time':
                const now = new Date();
                output = [
                    now.toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZoneName: 'short',
                    }),
                ];
                break;

            case 'history':
                if (commandHistory.length === 0) {
                    output = ['No commands in history yet.'];
                } else {
                    output = [
                        'Command History:',
                        '',
                        ...commandHistory.map((c, i) => `  ${i + 1}  ${c}`),
                    ];
                }
                break;

            case 'shortcuts':
                output = [
                    'Keyboard Shortcuts:',
                    '',
                    '  Tab / Ctrl+i  - Autocomplete command',
                    '  Up Arrow      - Previous command',
                    '  Down Arrow    - Next command',
                    '  Ctrl+l        - Clear terminal',
                    '  Ctrl+c        - Cancel current input',
                ];
                break;

            case 'welcome':
                setHistory([
                    { type: 'output', content: DUCKOS_ASCII },
                    { type: 'output', content: DUCK_ASCII },
                    { type: 'output', content: '' },
                    {
                        type: 'output',
                        content:
                            'Welcome to DuckOS! Type "help" for a list of commands.',
                    },
                    { type: 'output', content: '' },
                ]);
                return;

            case 'clear':
                setHistory([]);
                return;

            case 'gui':
                if (props.openGui) {
                    props.openGui();
                    output = ['Opening GUI...'];
                } else {
                    output = ['GUI not available.'];
                }
                break;

            default:
                if (lowerCmd === 'echo') {
                    output = [args.join(' ')];
                } else {
                    output = [
                        `bash: ${trimmedCmd}: command not found`,
                        'Type "help" to see available commands.',
                    ];
                }
        }

        addOutput(output);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (currentCommand.trim()) {
                setCommandHistory((prev) => [...prev, currentCommand]);
                executeCommand(currentCommand);
            } else {
                setHistory((prev) => [
                    ...prev,
                    {
                        type: 'command',
                        content: 'guest@nandobez.github.io:~$ ',
                    },
                ]);
            }
            setCurrentCommand('');
            setHistoryIndex(-1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex =
                    historyIndex === -1
                        ? commandHistory.length - 1
                        : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setCurrentCommand(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setCurrentCommand('');
                } else {
                    setHistoryIndex(newIndex);
                    setCurrentCommand(commandHistory[newIndex]);
                }
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
            setCurrentCommand('');
        } else if (e.key === 'c' && e.ctrlKey) {
            e.preventDefault();
            setCurrentCommand('');
        } else if (e.key === 'Tab' || (e.key === 'i' && e.ctrlKey)) {
            e.preventDefault();
            const commands = [
                'help',
                'about',
                'clear',
                'echo',
                'education',
                'email',
                'history',
                'projects',
                'pwd',
                'socials',
                'whoami',
                'skills',
                'contact',
                'time',
                'shortcuts',
                'gui',
                'welcome',
            ];
            const matches = commands.filter((cmd) =>
                cmd.startsWith(currentCommand.toLowerCase())
            );
            if (matches.length === 1) {
                setCurrentCommand(matches[0]);
            }
        }
    };

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    return (
        <Window
            top={100}
            left={100}
            width={900}
            height={600}
            windowTitle="Terminal"
            windowBarIcon="terminal"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="Terminal v1.0"
        >
            <div style={styles.terminal} onClick={handleTerminalClick}>
                <div style={styles.scrollContainer} ref={terminalRef}>
                    <div style={styles.content}>
                        {history.map((line, index) => (
                            <div key={index} style={styles.line}>
                                {line.content}
                            </div>
                        ))}
                        <div style={styles.inputLine}>
                            <span style={styles.prompt}>
                                guest@nandobez.github.io:~${' '}
                            </span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentCommand}
                                onChange={(e) =>
                                    setCurrentCommand(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                style={styles.input}
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    terminal: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        color: '#0f0',
        fontFamily: 'Courier New, Courier, monospace',
        fontSize: 13,
        overflow: 'hidden',
        cursor: 'text',
    },
    scrollContainer: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    content: {
        padding: 16,
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    line: {
        whiteSpace: 'pre',
        lineHeight: '1.2',
        marginBottom: 0,
        fontFamily: 'Courier New, Courier, monospace',
    },
    inputLine: {
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: 8,
        fontFamily: 'Courier New, Courier, monospace',
    },
    prompt: {
        color: '#0f0',
        fontFamily: 'Courier New, Courier, monospace',
        fontSize: 13,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        marginRight: 4,
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#0f0',
        fontFamily: 'Courier New, Courier, monospace',
        fontSize: 13,
        padding: 0,
        margin: 0,
        lineHeight: '1.2',
    },
};

export default Terminal;