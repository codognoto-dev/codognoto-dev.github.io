window.PJFLOW_DATA = {
  rules: [
    {id:'R001', category:'Documentação', condition:'Empresa com mais de 30 dias', result:'Exigir faturamento dos últimos 12 meses ou declaração de inexistência', severity:'Bloqueante'},
    {id:'R002', category:'Faturamento', condition:'Assinaturas híbridas', result:'Documento não aceito; solicitar novo documento com assinaturas do mesmo tipo', severity:'Bloqueante'},
    {id:'R003', category:'Faturamento', condition:'Assinaturas eletrônicas', result:'Validar assinaturas no ITI e guardar evidência', severity:'Atenção'},
    {id:'R004', category:'Faturamento', condition:'Faturamento acima de R$ 4,8 milhões', result:'Exigir Balanço Patrimonial e DRE', severity:'Bloqueante'},
    {id:'R005', category:'Renda PF', condition:'Sem comprovante de renda', result:'Na Cooperativa 1, seguir com renda presumida', severity:'Permitido'},
    {id:'R006', category:'Estado civil', condition:'Sócio casado', result:'Exigir certidão de casamento e documento do cônjuge', severity:'Bloqueante'},
    {id:'R007', category:'Estado civil', condition:'Sócio divorciado', result:'Exigir certidão com averbação do divórcio', severity:'Bloqueante'},
    {id:'R008', category:'QSA', condition:'QSA diferente do fluxo', result:'Tratar divergência antes de prosseguir', severity:'Bloqueante'},
    {id:'R009', category:'CRC', condition:'CRC inativo', result:'Tratar pendência antes de prosseguir', severity:'Bloqueante'},
    {id:'R010', category:'Junta Comercial', condition:'Contrato não é a última alteração', result:'Solicitar alteração contratual mais recente', severity:'Bloqueante'},
    {id:'R011', category:'Referências', condition:'Referência 1 igual à Referência 2', result:'Corrigir referências', severity:'Bloqueante'},
    {id:'R012', category:'Sócio', condition:'Sócio entrou após a abertura da empresa', result:'Usar a data de entrada constante no contrato social', severity:'Atenção'}
  ],
  defaultErrors: [
    {code:'EX-001', stage:'Efetivação', blocking:'SIM', message:'Exemplo de pendência bloqueante', cause:'Preencher com caso real', solution:'Preencher após validação operacional'},
    {code:'EX-002', stage:'Cadastro', blocking:'NÃO', message:'Exemplo de pendência não bloqueante', cause:'Preencher com caso real', solution:'Preencher após validação operacional'}
  ]
};
