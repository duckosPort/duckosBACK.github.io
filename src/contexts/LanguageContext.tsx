import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt';

const translations = {
    en: {
        // Navigation
        'nav.home': 'HOME',
        'nav.about': 'ABOUT',
        'nav.experience': 'EXPERIENCE',
        'nav.projects': 'PROJECTS',
        'nav.contact': 'CONTACT',
        'nav.software': 'SOFTWARE',
        'nav.music': 'MUSIC',
        'nav.art': 'ART',
        'nav.showcase': 'Portfolio \'25',

        // Home
        'home.role': 'Software Engineer & Data Scientist',
        'home.welcome': 'Welcome',
        'home.title': 'I\'m Fernando Bezerra (Nandobez)',
        'home.description': 'I\'m a Software & Data Engineer currently working at Doctor Home! I\'m in my 5th semester of Computer Science at UNIFOR (Universidade de Fortaleza).',
        'home.contact': 'Thank you for taking the time to check out my portfolio. I really hope you enjoy exploring it as much as I enjoyed building it. If you have any questions or comments, feel free to contact me using',
        'home.form': 'this form',
        'home.or': 'or shoot me an email at',

        // About
        'about.title': 'About Me',
        'about.intro': 'From a young age, I\'ve been passionate about technology, art, and mathematics. Since high school, I\'ve explored programming in both hardware and software. My curiosity naturally led me to dive deep into understanding how systems work, from Arduino projects to fullstack development.\n',
        'about.education': 'I\'m currently in my 5th semester of Computer Science at UNIFOR (Universidade de Fortaleza). My journey led me to work at the LAPIN and LARI labs, where I developed solutions in data science, robotics, and applied research. Now, I\'m working as a Software & Data Engineer at Doctor Home, developing medical services at scale using SpringBoot, React, PostgreSQL, and implementing Machine Learning models for healthcare applications.',
        'about.skills': 'I\'m self-taught, data-driven, and passionate about transforming data into useful knowledge. I work with descriptive analysis, data visualization, scalable systems development, and Machine Learning models using PyTorch, TensorFlow, and Scikit-Learn. I also have C1 level English proficiency and enjoy consuming technical content without difficulties.',
        'about.hobbies': 'My Hobbies',
        'about.hobbies.desc': 'Beyond software and data science, I enjoy creating Digital Art and Music. I\'m also interested in game development, having worked with Unity and Godot. You can check out more of my creative work in the projects section.',
        'about.hobbies.desc2': 'I also have a passion for finance and investment analysis, applying data-driven approaches to strategic decision-making. In my free time, I love working on personal projects, exploring new technologies, and of course, anything related to ducks! 🦆 QUACK!',
        'about.thanks': 'Thanks for reading about me! I hope that you enjoy exploring the rest of my portfolio website and everything it has to offer. If you have any questions or find something interesting, feel free to reach out! Good luck and have fun! 🦆',
        'about.reach': 'If you have any questions or comments I would love to hear them. You can reach me through the',
        'about.contact.page': 'contact page',

        // About - Personal Life
        'about.personal.title': 'A Little More About Me',
        'about.personal.coffee.title': 'Coffee Enthusiast',
        'about.personal.coffee.desc': 'I\'m a huge coffee lover! Much of my productivity and focus comes from a good cup of coffee. It\'s more than just a beverage - it\'s fuel for creativity and problem-solving.',
        'about.personal.coffee.caption': 'Coffee - my daily companion',
        'about.personal.gabriela.title': 'My Fiancée Gabriela',
        'about.personal.gabriela.desc': 'Much of what I\'ve achieved, I owe to my fiancée Gabriela. Her support and encouragement have been fundamental to my journey. The little fox on my desk is a reference to her - a constant reminder of her presence and support in everything I do.',
        'about.personal.gabriela.caption': 'With my fiancée Gabriela',
        'about.personal.hardware.title': 'Hardware, Software & Beyond',
        'about.personal.hardware.desc': 'I have a deep passion for both hardware and software. I particularly enjoy robotics, IoT, and low-level programming. There\'s something fascinating about working close to the metal, understanding how things work at the fundamental level, and bringing electronics to life through code.',
        'about.personal.hardware.caption': 'Working with IoT and hardware projects',
        'about.personal.cats.title': 'My Cats: Koshki & Luna',
        'about.personal.cats.desc': 'I share my home with two wonderful cats: Koshki and Luna. They\'re my companions during long coding sessions and always manage to bring joy (and occasional chaos) to my workspace.',
        'about.personal.cats.koshki': 'Koshki',
        'about.personal.cats.luna': 'Luna',

        // Experience
        'exp.doctor.title': 'Doctor Home',
        'exp.doctor.role': 'Software & Data Engineer',
        'exp.doctor.date': 'January 2025 - Present',
        'exp.doctor.desc': 'Developing large-scale medical services using SpringBoot, Spring Security, React, PostgreSQL, Docker, RabbitMQ, and GitHub CI/CD. Focusing on data-driven solutions for healthcare applications.',
        'exp.doctor.1': 'Architected and implemented scalable medical services using microservices architecture with SpringBoot and Spring Security, ensuring HIPAA-compliant data handling and secure authentication.',
        'exp.doctor.2': 'Developed and deployed Machine Learning and AI models for medical applications using N8N, Ollama, Burn, PyTorch, TensorFlow, and Scikit-Learn, improving diagnostic accuracy and patient care.',
        'exp.doctor.3': 'Created interactive data visualizations and dashboards using Plotly/Dash and FastAPI, enabling real-time monitoring of medical data and key performance indicators.',
        'exp.doctor.4': 'Implemented automated data scraping and processing pipelines, reducing manual data entry time by 70% and improving data accuracy.',
        'exp.doctor.5': 'Produced comprehensive technical documentation using LaTeX, Swagger, and Shotgun, facilitating knowledge transfer and maintaining code quality.',

        'exp.lapin.title': 'LAPIN & LARI Labs',
        'exp.lapin.role': 'Research Developer',
        'exp.lapin.date': '2023 - 2024',
        'exp.lapin.desc': 'Worked on robotics and hardware projects at UNIFOR\'s research laboratories, developing technological solutions involving digital fabrication, embedded systems, and hardware design.',
        'exp.lapin.1': 'Developed robotics projects integrating sensors, actuators, and control systems, implementing solutions with microcontrollers and embedded systems.',
        'exp.lapin.2': 'Worked with 3D printing and CNC cutting for prototyping and manufacturing mechanical components and structures for robotics projects.',
        'exp.lapin.3': 'Performed low-level programming (C/C++) for microcontrollers, optimizing performance and resource management in embedded systems.',
        'exp.lapin.4': 'Planned and coordinated technical projects, designing printed circuit boards (PCB) for custom hardware applications.',

        'exp.academic.title': 'Academic Projects',
        'exp.academic.role': 'Computer Science Student',
        'exp.academic.date': '2022 - Present',
        'exp.academic.desc': 'Developing various projects as part of Computer Science coursework at UNIFOR, applying SOLID principles, Clean Code practices, and modern software engineering methodologies.',
        'exp.academic.1': 'Built fullstack applications using Java, Python, Angular, and React, implementing RESTful APIs, authentication systems, and responsive UIs.',
        'exp.academic.2': 'Conducted data analysis and visualization projects using R, Python (Pandas, Matplotlib, Seaborn), creating insightful reports and interactive dashboards.',
        'exp.academic.3': 'Designed and implemented relational databases using PostgreSQL and MySQL, applying normalization principles and query optimization techniques.',
        'exp.academic.4': 'Created comprehensive technical documentation using LaTeX (Overleaf), detailing system architectures, algorithms, and research findings.',
        'exp.academic.5': 'Applied SOLID principles and Clean Code practices across all projects, ensuring maintainable, scalable, and testable code.',

        // Contact
        'contact.title': 'Contact',
        'contact.desc': 'I\'m currently working at Doctor Home, but I\'m always open to discussing new opportunities and interesting projects! Feel free to reach out via email or the form below - I\'d love to chat!',
        'contact.email': 'Email:',
        'contact.name': 'Your name:',
        'contact.company': 'Company (optional):',
        'contact.message': 'Message:',
        'contact.send': 'Send Message',

        // Resume
        'resume.title': 'Looking for my resume?',
        'resume.en': 'English Version',
        'resume.pt': 'Portuguese Version',

        // Projects Page
        'projects.title': 'Projects',
        'projects.subtitle': '& Hobbies',
        'projects.description': 'Click on one of the areas below to check out some of my favorite projects I\'ve done in that field. I spent a lot of time to include a lot of visuals and interactive media to showcase each project. Enjoy!',
        'projects.software': 'Software',
        'projects.software.subtitle': 'PROJECTS',
        'projects.music': 'Music',
        'projects.music.subtitle': 'VENTURES',
        'projects.art': 'Art',
        'projects.art.subtitle': 'ENDEAVORS',

        // Software Projects
        'software.title': 'Software',
        'software.subtitle': 'Projects',
        'software.description': 'Below are some of my favorite software projects I have worked on over the last few years.',
        'software.links': 'Links:',

        'software.proj1.title': 'Tone Key Reader',
        'software.proj1.desc1': 'A Python tool that analyzes audio files and automatically estimates the key (root note and major/minor mode), main chords, and predominant Greek mode (Dorian, Phrygian, etc.). Uses harmonic spectral analysis via librosa and vector operations based on linear algebra.',
        'software.proj1.desc2': 'The tool extracts chromas (intensity of each of the 12 musical notes), calculates correlations with major and minor scale templates, identifies the main chords through histograms of the most frequent combinations, and estimates the Greek mode by comparing with binary vectors for each mode.',

        'software.proj2.title': 'Flappy Bird ML - Genetic Algorithm',
        'software.proj2.desc1': 'An implementation of the classic Flappy Bird game where the birds learn to play using genetic algorithms and artificial neural networks. The project demonstrates how artificial intelligence can evolve complex behaviors through simulated natural selection.',
        'software.proj2.desc2': 'Each bird has a feedforward neural network with 4 input neurons (Y distance, X distance, velocity, normalized height), 8 hidden neurons with sigmoid activation, and 1 output neuron that decides whether the bird should jump. The genetic algorithm uses roulette selection, Gaussian mutation, and elitism to evolve the population.',

        'software.proj3.title': 'Chat Server POSIX/TCP',
        'software.proj3.desc1': 'A chat server implementation in C using POSIX sockets and TCP protocol. The server allows multiple clients to connect simultaneously and exchange messages in real-time, demonstrating low-level network programming concepts.',

        'software.proj4.title': 'Gemini CLI Chat',
        'software.proj4.desc1': 'A command-line interface chat application using Google\'s Gemini AI. Created before the official Gemini CLI was released, this project allows users to interact with Gemini directly from the terminal, making AI assistance more accessible for developers.',

        'software.proj5.title': 'Paint for ESP32 CYD',
        'software.proj5.desc1': 'A drawing application for the ESP32 CYD (Cheap Yellow Display) with touchscreen. This embedded systems project demonstrates real-time touch input processing and graphics rendering on microcontroller hardware.',

        'software.proj6.title': 'YouTube Song Downloader',
        'software.proj6.desc1': 'A utility tool for downloading audio from YouTube videos. The application provides a simple interface for extracting and saving music from YouTube content for offline listening.',

        'software.proj7.title': 'Polaroide',
        'software.proj7.desc1': 'A personal website created as a gift for my girlfriend. This project showcases creative web design and development skills with a focus on user experience and emotional connection through digital media.',

        'software.proj8.title': 'Sérgio Magalhães Author Website',
        'software.proj8.desc1': 'A promotional website created for my father\'s books. The site features information about the author, book descriptions, and purchase links, demonstrating skills in creating professional portfolio and marketing websites.',

        // Art Projects
        'art.title': 'Art & Design',
        'art.subtitle': 'Endeavors',
        'art.drawing.title': 'Drawing',
        'art.drawing.desc': 'I enjoy drawing as a creative outlet. It allows me to express ideas and explore different artistic styles. Below are some of my sketches and artwork.',
        'art.drawing.figure2': 'Face sketch',
        'art.drawing.figure3': 'Star Wars inspired artwork',
        'art.rpg.title': 'RPG & D&D',
        'art.rpg.desc1': 'I really enjoy playing RPG games, especially Dungeons & Dragons. The storytelling, world-building, and creative problem-solving aspects of tabletop RPGs are incredibly engaging.',
        'art.rpg.figure4': 'D&D themed artwork',
        'art.rpg.desc2': 'I love using what I learn from campaigns in my creative work. This includes creating custom maps, character designs, and visual aids for storytelling.',
        'art.rpg.figure5': 'Campaign visual edit',
        'art.ui.title': 'UI/UX Design',
        'art.ui.desc': 'My editing skills aren\'t just useful for RPG campaigns - they\'re also great for creating user interfaces. I\'ve applied these skills to various professional projects. Here are some UI designs I\'ve created:',
        'art.ui.figure6': 'Interface 1',
        'art.ui.figure7': 'Interface 2',
        'art.ui.figure8': 'Interface 3',
        'art.ui.figure9': 'Interface 4',
        'art.ui.figure10': 'Additional Interface',

        // Music Projects
        'music.title': 'Music & Performance',
        'music.subtitle': 'Ventures',
        'music.intro.p1': 'Music has been one of my greatest passions throughout my life. I appreciate various musical styles and enjoy playing different instruments, from jazz standards to Brazilian samba and progressive rock.',
        'music.intro.p2': 'What fascinates me most about music is how it connects with other forms of art and even with mathematics and programming. The patterns, structures, and algorithms present in music are similar to those we find in code.',
        'music.intro.p3.part1': 'This intersection between music and technology led me to develop projects like the',
        'music.intro.p3.link': 'Tone Key Reader',
        'music.intro.p3.part2': ', a tool that analyzes audio files and automatically identifies the key, main chords, and predominant Greek mode using spectral analysis and linear algebra.',
        'music.autumn.title': 'Autumn Leaves - Jazz Standard',
        'music.autumn.desc': 'One of the most iconic jazz standards. This rendition explores harmonic variations and improvisation, demonstrating the beauty of modal interchange and melodic development.',
        'music.samba.title': 'Samba da Volta - Brazilian Music',
        'music.samba.desc': 'Brazilian samba is rich in rhythm and syncopation. This piece showcases the complexity of Brazilian rhythmic patterns and the joy that this musical style brings.',
        'music.lucretia.title': 'Lucretia - Progressive Rock',
        'music.lucretia.desc': 'An exploration of progressive rock with complex time signatures and technical passages. This demonstrates the fusion of different musical styles and techniques.',
        'music.future.title': 'The Intersection of Arts',
        'music.future.desc': 'I believe that the best creations come from the intersection of different disciplines. Music, mathematics, programming, and visual arts all share fundamental principles. By exploring these connections, we can create something truly unique and meaningful.',
    },
    pt: {
        // Navigation
        'nav.home': 'INÍCIO',
        'nav.about': 'SOBRE',
        'nav.experience': 'EXPERIÊNCIA',
        'nav.projects': 'PROJETOS',
        'nav.contact': 'CONTATO',
        'nav.software': 'SOFTWARE',
        'nav.music': 'MÚSICA',
        'nav.art': 'ARTE',
        'nav.showcase': 'Portfólio \'25',

        // Home
        'home.role': 'Engenheiro de Software e Cientista de Dados',
        'home.welcome': 'Bem-vindo',
        'home.title': 'Eu sou Fernando Bezerra (Nandobez)',
        'home.description': 'Sou Engenheiro de Software e Dados trabalhando atualmente na Doctor Home! Estou no 5º semestre de Ciência da Computação na UNIFOR (Universidade de Fortaleza).',
        'home.contact': 'Obrigado por dedicar seu tempo para conhecer meu portfólio. Espero que você goste de explorá-lo tanto quanto eu gostei de construí-lo. Se você tiver alguma dúvida ou comentário, sinta-se à vontade para entrar em contato usando',
        'home.form': 'este formulário',
        'home.or': 'ou me envie um e-mail para',

        // About
        'about.title': 'Sobre Mim',
        'about.intro': 'Desde jovem, sou apaixonado por tecnologia, arte e matemática. Desde o ensino médio, exploro programação tanto em hardware quanto em software. Minha curiosidade naturalmente me levou a mergulhar profundamente em entender como os sistemas funcionam, desde projetos com Arduino até desenvolvimento fullstack.\n',
        'about.education': 'Atualmente estou no 5º semestre de Ciência da Computação na UNIFOR (Universidade de Fortaleza). Minha jornada me levou a trabalhar nos laboratórios LAPIN e LARI, onde desenvolvi soluções em ciência de dados, robótica e pesquisa aplicada. Agora, trabalho como Engenheiro de Software e Dados na Doctor Home, desenvolvendo serviços médicos em larga escala usando SpringBoot, React, PostgreSQL e implementando modelos de Machine Learning para aplicações na área da saúde.',
        'about.skills': 'Sou autodidata, orientado por dados e apaixonado por transformar dados em conhecimento útil. Trabalho com análise descritiva, visualização de dados, desenvolvimento de sistemas escaláveis e modelos de Machine Learning usando PyTorch, TensorFlow e Scikit-Learn. Também tenho proficiência em inglês nível C1 e consumo conteúdo técnico sem dificuldades.',
        'about.hobbies': 'Meus Hobbies',
        'about.hobbies.desc': 'Além de software e ciência de dados, gosto de criar Arte Digital e Música. Também me interesso por desenvolvimento de jogos, tendo trabalhado com Unity e Godot. Você pode conferir mais do meu trabalho criativo na seção de projetos.',
        'about.hobbies.desc2': 'Também tenho paixão por finanças e análise de investimentos, aplicando abordagens orientadas por dados para tomada de decisões estratégicas. No meu tempo livre, adoro trabalhar em projetos pessoais, explorar novas tecnologias e, claro, qualquer coisa relacionada a patos! 🦆 QUACK!',
        'about.thanks': 'Obrigado por ler sobre mim! Espero que você goste de explorar o resto do meu site de portfólio e tudo o que ele tem a oferecer. Se você tiver alguma dúvida ou encontrar algo interessante, sinta-se à vontade para entrar em contato! Boa sorte e divirta-se! 🦆',
        'about.reach': 'Se você tiver alguma dúvida ou comentário, adoraria ouvi-los. Você pode entrar em contato através da',
        'about.contact.page': 'página de contato',

        // About - Personal Life
        'about.personal.title': 'Um Pouco Mais Sobre Mim',
        'about.personal.coffee.title': 'Entusiasta de Café',
        'about.personal.coffee.desc': 'Sou um grande amante de café! Muito da minha produtividade e foco vem de uma boa xícara de café. É mais do que apenas uma bebida - é combustível para criatividade e resolução de problemas.',
        'about.personal.coffee.caption': 'Café - meu companheiro diário',
        'about.personal.gabriela.title': 'Minha Noiva Gabriela',
        'about.personal.gabriela.desc': 'Muito do que conquistei, devo à minha noiva Gabriela. Seu apoio e incentivo foram fundamentais para minha jornada. A raposinha na minha mesa é uma referência a ela - um lembrete constante de sua presença e apoio em tudo que faço.',
        'about.personal.gabriela.caption': 'Com minha noiva Gabriela',
        'about.personal.hardware.title': 'Hardware, Software e Além',
        'about.personal.hardware.desc': 'Tenho uma paixão profunda por hardware e software. Gosto especialmente de robótica, IoT e programação de baixo nível. Há algo fascinante em trabalhar perto do metal, entendendo como as coisas funcionam no nível fundamental e dando vida à eletrônica através de código.',
        'about.personal.hardware.caption': 'Trabalhando com projetos de IoT e hardware',
        'about.personal.cats.title': 'Meus Gatos: Koshki & Luna',
        'about.personal.cats.desc': 'Divido minha casa com dois gatos maravilhosos: Koshki e Luna. Eles são meus companheiros durante longas sessões de programação e sempre conseguem trazer alegria (e caos ocasional) para meu espaço de trabalho.',
        'about.personal.cats.koshki': 'Koshki',
        'about.personal.cats.luna': 'Luna',

        // Experience
        'exp.doctor.title': 'Doctor Home',
        'exp.doctor.role': 'Engenheiro de Software e Dados',
        'exp.doctor.date': 'Janeiro 2025 - Presente',
        'exp.doctor.desc': 'Desenvolvimento de serviços médicos em larga escala usando SpringBoot, Spring Security, React, PostgreSQL, Docker, RabbitMQ e GitHub CI/CD. Focado em soluções orientadas por dados para aplicações na área da saúde.',
        'exp.doctor.1': 'Arquitetei e implementei serviços médicos escaláveis usando arquitetura de microsserviços com SpringBoot e Spring Security, garantindo tratamento de dados compatível com HIPAA e autenticação segura.',
        'exp.doctor.2': 'Desenvolvi e implantei modelos de Machine Learning e IA para aplicações médicas usando N8N, Ollama, Burn, PyTorch, TensorFlow e Scikit-Learn, melhorando a precisão diagnóstica e o cuidado ao paciente.',
        'exp.doctor.3': 'Criei visualizações de dados interativas e dashboards usando Plotly/Dash e FastAPI, permitindo monitoramento em tempo real de dados médicos e indicadores-chave de desempenho.',
        'exp.doctor.4': 'Implementei pipelines automatizados de coleta e processamento de dados, reduzindo o tempo de entrada manual de dados em 70% e melhorando a precisão dos dados.',
        'exp.doctor.5': 'Produzi documentação técnica abrangente usando LaTeX, Swagger e Shotgun, facilitando a transferência de conhecimento e mantendo a qualidade do código.',

        'exp.lapin.title': 'LAPIN & LARI Labs',
        'exp.lapin.role': 'Desenvolvedor de Pesquisa',
        'exp.lapin.date': '2023 - 2024',
        'exp.lapin.desc': 'Trabalhei em projetos de robótica e hardware nos laboratórios de pesquisa da UNIFOR, desenvolvendo soluções tecnológicas envolvendo fabricação digital, sistemas embarcados e design de hardware.',
        'exp.lapin.1': 'Desenvolvi projetos de robótica integrando sensores, atuadores e sistemas de controle, implementando soluções com microcontroladores e sistemas embarcados.',
        'exp.lapin.2': 'Trabalhei com impressão 3D e corte CNC para prototipagem e fabricação de componentes mecânicos e estruturas para projetos de robótica.',
        'exp.lapin.3': 'Realizei programação em baixo nível (C/C++) para microcontroladores, otimizando performance e gerenciamento de recursos em sistemas embarcados.',
        'exp.lapin.4': 'Planejei e coordenei projetos técnicos, realizando design de placas de circuito impresso (PCB) para aplicações customizadas de hardware.',

        'exp.academic.title': 'Projetos Acadêmicos',
        'exp.academic.role': 'Estudante de Ciência da Computação',
        'exp.academic.date': '2022 - Presente',
        'exp.academic.desc': 'Desenvolvimento de vários projetos como parte do curso de Ciência da Computação na UNIFOR, aplicando princípios SOLID, práticas de Clean Code e metodologias modernas de engenharia de software.',
        'exp.academic.1': 'Construí aplicações fullstack usando Java, Python, Angular e React, implementando APIs RESTful, sistemas de autenticação e UIs responsivas.',
        'exp.academic.2': 'Conduzi projetos de análise e visualização de dados usando R, Python (Pandas, Matplotlib, Seaborn), criando relatórios perspicazes e dashboards interativos.',
        'exp.academic.3': 'Projetei e implementei bancos de dados relacionais usando PostgreSQL e MySQL, aplicando princípios de normalização e técnicas de otimização de consultas.',
        'exp.academic.4': 'Criei documentação técnica abrangente usando LaTeX (Overleaf), detalhando arquiteturas de sistemas, algoritmos e descobertas de pesquisa.',
        'exp.academic.5': 'Apliquei princípios SOLID e práticas de Clean Code em todos os projetos, garantindo código manutenível, escalável e testável.',

        // Contact
        'contact.title': 'Contato',
        'contact.desc': 'Atualmente estou trabalhando na Doctor Home, mas estou sempre aberto a discutir novas oportunidades e projetos interessantes! Sinta-se à vontade para entrar em contato via e-mail ou pelo formulário abaixo - adoraria conversar!',
        'contact.email': 'E-mail:',
        'contact.name': 'Seu nome:',
        'contact.company': 'Empresa (opcional):',
        'contact.message': 'Mensagem:',
        'contact.send': 'Enviar Mensagem',

        // Resume
        'resume.title': 'Procurando meu currículo?',
        'resume.en': 'Versão em Inglês',
        'resume.pt': 'Versão em Português',

        // Projects Page
        'projects.title': 'Projetos',
        'projects.subtitle': '& Hobbies',
        'projects.description': 'Clique em uma das áreas abaixo para conferir alguns dos meus projetos favoritos que fiz nessa área. Dediquei muito tempo para incluir muitas imagens e mídias interativas para mostrar cada projeto. Aproveite!',
        'projects.software': 'Software',
        'projects.software.subtitle': 'PROJETOS',
        'projects.music': 'Música',
        'projects.music.subtitle': 'AVENTURAS',
        'projects.art': 'Arte',
        'projects.art.subtitle': 'EMPREITADAS',

        // Software Projects
        'software.title': 'Software',
        'software.subtitle': 'Projetos',
        'software.description': 'Abaixo estão alguns dos meus projetos de software favoritos nos quais trabalhei nos últimos anos.',
        'software.links': 'Links:',

        'software.proj1.title': 'Tone Key Reader',
        'software.proj1.desc1': 'Uma ferramenta em Python que analisa arquivos de áudio e estima automaticamente a tonalidade (nota raiz e modo maior/menor), os principais acordes e o modo grego predominante (dórico, frígio, etc.). Utiliza análise espectral harmônica via librosa e operações vetoriais baseadas em álgebra linear.',
        'software.proj1.desc2': 'A ferramenta extrai cromas (intensidade de cada das 12 notas musicais), calcula correlações com templates de escalas maiores e menores, identifica os principais acordes através de histogramas das combinações mais frequentes e estima o modo grego comparando com vetores binários para cada modo.',

        'software.proj2.title': 'Flappy Bird ML - Algoritmo Genético',
        'software.proj2.desc1': 'Uma implementação do clássico jogo Flappy Bird onde os pássaros aprendem a jogar usando algoritmos genéticos e redes neurais artificiais. O projeto demonstra como a inteligência artificial pode evoluir comportamentos complexos através de seleção natural simulada.',
        'software.proj2.desc2': 'Cada pássaro possui uma rede neural feedforward com 4 neurônios de entrada (distância Y, distância X, velocidade, altura normalizada), 8 neurônios ocultos com ativação sigmoid e 1 neurônio de saída que decide se o pássaro deve pular. O algoritmo genético usa seleção por roleta, mutação gaussiana e elitismo para evoluir a população.',

        'software.proj3.title': 'Servidor de Chat POSIX/TCP',
        'software.proj3.desc1': 'Uma implementação de servidor de chat em C usando sockets POSIX e protocolo TCP. O servidor permite que múltiplos clientes se conectem simultaneamente e troquem mensagens em tempo real, demonstrando conceitos de programação de rede de baixo nível.',

        'software.proj4.title': 'Gemini CLI Chat',
        'software.proj4.desc1': 'Uma aplicação de chat por interface de linha de comando usando a IA Gemini do Google. Criado antes do lançamento oficial do Gemini CLI, este projeto permite que usuários interajam com o Gemini diretamente do terminal, tornando a assistência de IA mais acessível para desenvolvedores.',

        'software.proj5.title': 'Paint para ESP32 CYD',
        'software.proj5.desc1': 'Uma aplicação de desenho para o ESP32 CYD (Cheap Yellow Display) com touchscreen. Este projeto de sistemas embarcados demonstra processamento de entrada touch em tempo real e renderização gráfica em hardware de microcontrolador.',

        'software.proj6.title': 'YouTube Song Downloader',
        'software.proj6.desc1': 'Uma ferramenta utilitária para baixar áudio de vídeos do YouTube. A aplicação fornece uma interface simples para extrair e salvar músicas do conteúdo do YouTube para audição offline.',

        'software.proj7.title': 'Polaroide',
        'software.proj7.desc1': 'Um site pessoal criado como presente para minha namorada. Este projeto mostra habilidades de design e desenvolvimento web criativo com foco em experiência do usuário e conexão emocional através de mídia digital.',

        'software.proj8.title': 'Site do Autor Sérgio Magalhães',
        'software.proj8.desc1': 'Um site promocional criado para os livros do meu pai. O site apresenta informações sobre o autor, descrições dos livros e links para compra, demonstrando habilidades na criação de sites profissionais de portfólio e marketing.',

        // Art Projects
        'art.title': 'Arte & Design',
        'art.subtitle': 'Empreitadas',
        'art.drawing.title': 'Desenho',
        'art.drawing.desc': 'Gosto de desenhar como uma forma de expressão criativa. Isso me permite expressar ideias e explorar diferentes estilos artísticos. Abaixo estão alguns dos meus esboços e trabalhos artísticos.',
        'art.drawing.figure2': 'Esboço de rosto',
        'art.drawing.figure3': 'Arte inspirada em Star Wars',
        'art.rpg.title': 'RPG & D&D',
        'art.rpg.desc1': 'Gosto muito de jogar jogos de RPG, especialmente Dungeons & Dragons. A narrativa, construção de mundo e aspectos criativos de resolução de problemas dos RPGs de mesa são incrivelmente envolventes.',
        'art.rpg.figure4': 'Arte temática de D&D',
        'art.rpg.desc2': 'Adoro usar o que aprendo com campanhas no meu trabalho criativo. Isso inclui criar mapas personalizados, designs de personagens e recursos visuais para narrativa.',
        'art.rpg.figure5': 'Edição visual de campanha',
        'art.ui.title': 'Design UI/UX',
        'art.ui.desc': 'Minhas habilidades de edição não são úteis apenas para campanhas de RPG - elas também são ótimas para criar interfaces de usuário. Apliquei essas habilidades em vários projetos profissionais. Aqui estão alguns designs de UI que criei:',
        'art.ui.figure6': 'Interface 1',
        'art.ui.figure7': 'Interface 2',
        'art.ui.figure8': 'Interface 3',
        'art.ui.figure9': 'Interface 4',
        'art.ui.figure10': 'Interface Adicional',

        // Music Projects
        'music.title': 'Música & Performance',
        'music.subtitle': 'Aventuras',
        'music.intro.p1': 'A música tem sido uma das minhas maiores paixões ao longo da vida. Aprecio vários estilos musicais e gosto de tocar diferentes instrumentos, desde standards de jazz até samba brasileiro e rock progressivo.',
        'music.intro.p2': 'O que mais me fascina na música é como ela se conecta com outras formas de arte e até mesmo com matemática e programação. Os padrões, estruturas e algoritmos presentes na música são semelhantes aos que encontramos no código.',
        'music.intro.p3.part1': 'Essa intersecção entre música e tecnologia me levou a desenvolver projetos como o',
        'music.intro.p3.link': 'Tone Key Reader',
        'music.intro.p3.part2': ', uma ferramenta que analisa arquivos de áudio e identifica automaticamente a tonalidade, os principais acordes e o modo grego predominante usando análise espectral e álgebra linear.',
        'music.autumn.title': 'Autumn Leaves - Standard de Jazz',
        'music.autumn.desc': 'Um dos standards de jazz mais icônicos. Esta interpretação explora variações harmônicas e improvisação, demonstrando a beleza do intercâmbio modal e desenvolvimento melódico.',
        'music.samba.title': 'Samba da Volta - Música Brasileira',
        'music.samba.desc': 'O samba brasileiro é rico em ritmo e síncope. Esta peça mostra a complexidade dos padrões rítmicos brasileiros e a alegria que este estilo musical traz.',
        'music.lucretia.title': 'Lucretia - Rock Progressivo',
        'music.lucretia.desc': 'Uma exploração do rock progressivo com métricas complexas e passagens técnicas. Isso demonstra a fusão de diferentes estilos e técnicas musicais.',
        'music.future.title': 'A Interseção das Artes',
        'music.future.desc': 'Acredito que as melhores criações vêm da intersecção de diferentes disciplinas. Música, matemática, programação e artes visuais compartilham princípios fundamentais. Ao explorar essas conexões, podemos criar algo verdadeiramente único e significativo.',
    },
};

type TranslationKeys = keyof typeof translations.en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: TranslationKeys): string => {
        return translations[language][key];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
