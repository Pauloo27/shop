# Requisitos Funcionais:

1. **Login de Usuário:**
   - Os usuários cadastrados devem ser capazes de fazer login com sucesso, fornecendo seu _username_ e senha.
   - O sistema deve autenticar o usuário e fornecer acesso às funcionalidades do sistema após o login.

2. **Cadastro de Usuário:**
   - O primeiro usuário (_admin_), poderá cadastrar novos usuários no sistema.
   - Os _admin_ devem fornecer um _username_ e uma senha para cadastrar um novo usuário.

3. **Cadastro de Produtos:**
   - O _admin_ deve ser capaz de cadastrar novos produtos no sistema.
   - Os produtos devem conter informações como nome, preço e quantidade disponível.

4. **Listagem de Produtos:**
   - Deve haver uma página ou interface que exibe a lista de produtos cadastrados.
   - Os produtos devem ser apresentados de forma organizada, incluindo nome, preço e quantidade disponível.

5. **Registro de Vendas:**
   - Deve haver uma funcionalidade que permite aos usuários registrar uma venda.
   - O registro de vendas deve atualizar a quantidade disponível dos produtos vendidos.

6. **Listagem de Vendas:**
   - Deve haver uma página ou seção que exibe a lista de vendas registradas, apenas para o _admin_.
   - As vendas registradas devem incluir informações sobre os produtos vendidos, a data da venda e usuário que registrou a venda.

# Requisitos Não Funcionais:

1. **Segurança:**
   - O sistema deve garantir a segurança das informações dos usuários, especialmente senhas, usando hashs e jwt.
   - Deve ser implementada uma camada de segurança, como CORS e HTTPS (exceto em localhost), para proteger a comunicação entre o frontend e o backend.

2. **Desempenho:**
   - O sistema deve ser responsivo e eficiente, evitando atrasos significativos na carga de páginas e na realização de ações.
   - Deve ser otimizado para lidar com um grande número de produtos e vendas, se necessário.

3. **Usabilidade:**
   - A interface do usuário (UI) deve ser amigável e intuitiva, de modo que os usuários possam facilmente realizar as tarefas desejadas.
   - Deve haver feedback claro para o usuário ao realizar ações, como registros de venda bem-sucedidos.

4. **Compatibilidade:**
   - O sistema deve ser compatível com navegadores modernos, como Chrome, Firefox.
   - Deve ser responsivo para diferentes tamanhos de tela, incluindo dispositivos móveis.

5. **Tecnologias:**
   - O _frontend_ do sistema deve ser feito usando Javascript, React e NestJS.
   - O _backend_ do sistema deve ser feito usando _Golang_ e um banco _SQL_.
