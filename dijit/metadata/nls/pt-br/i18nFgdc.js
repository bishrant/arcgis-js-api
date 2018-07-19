// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.25/esri/copyright.txt for details.

define({documentTypes:{fgdc:{caption:"FGDC",description:""}},alternates:{none:"Nenhum",notComplete:"Não completo",other:"Outro",present:"Presente",unknown:"Desconhecido",unpublishedMaterial:"Material inédito"},hints:{integerGreaterThanOne:"(insira um inteiro > 1)",integer0To100:"(insira um inteiro 0..100)"},citeinfo:{caption:"Informações de referência",origin:"Criador",pubdate:"Data de Publicação",pubtime:"Tempo de publicação",title:"Título",edition:"Edição",geoform:{caption:"Forma de Apresentação dos Dados Geoespaciais",atlas:"Atlas",audio:"Áudio",diagram:"Diagrama",sDocument:"Documentos",globe:"Globo",map:"Mapa",model:"Modelo",multiMediaPresentation:"Apresentação Multimídia",profile:"Perfil",rasterDigitalData:"Dados digitais do raster",remoteSensingImage:"Imagem de sensoriamento remoto",section:"Seção",spreadsheet:"Planilha",tabularDigitalData:"Dados digitais tabelares",vectorDigitalData:"Dados digitais do vetor",video:"Vídeo",view:"Visualizar"},serinfo:{caption:"Informações de Séries",sername:"Nome de Série",issue:"Identificação do Problema"},pubinfo:{caption:"Informações de Publicação",pubplace:"Local de Publicação",publish:"Publicador"},othercit:"Outros Detalhes de Citação",onlink:"Ligação On-line (URL)"},cntinfo:{caption:"Informações de Contato",section:{primary:"Primário",phoneAndEmail:"Telefone e E-Mail",hoursAndInstructions:"Horários e Instruções"},cntorgp:{caption:"Por organização",cntorg:"Organização",cntper:"Pessoa"},cntperp:{caption:"Por pessoa",cntper:"Pessoa",cntorg:"Organização"},cntpos:"Posição",cntaddr:{caption:"Endereço",addrtype:{caption:"Tipo de Endereço",mailing:"Mala direta",physical:"Físico",mailingAndPhysical:"Mala Direta e Física"},address:"Endereço",city:"Cidade",state:"Estado",postal:"Código Postal",country:"País"},cntvoice:"Voz",cnttdd:"TDD/TTY Telefone (audição prejudicada)",cntfax:"Fax",cntemail:"Endereço de Correio Eletrônico",hours:"Horas",cntinst:"Instruções"},dataqual:{caption:"Informações de Qualidade dos Dados",section:{attributeAccuracy:"Precisão do Atributo",logicalConsistency:"Consistência Lógica",completeness:"Integridade",positionalAccuracy:"Acurácia Posicional",lineage:"Linhagem",cloudCover:"Cobertura de Nuvens"},attracc:{caption:"Precisão do Atributo",attraccr:"Relatório de Precisão do Atributo",qattracc:{caption:"Avaliação de Acurácia do Atributo Quantitativo",attraccv:"Valor de Precisão do Atributo",attracce:"Explanação da Acurácia do Atributo"}},logic:"Relatório de Consistência Lógica",complete:"Relatório de Totalidade",posacc:"Acurácia Posicional",horizpa:{caption:"Acurácia Posicional Horizontal",horizpar:"Relatório da Acurácia Posicional Horizontal",qhorizpa:{caption:"Avaliação de Acurácia Posicional Horizontal Quantitativa",horizpav:"Valor da Acurácia Posicional Horizontal",horizpae:"Explanação da Acurácia Posicional Horizontal"}},vertacc:{caption:"Acurácia Posicional Vertical",vertaccr:"Relatório de Acurácia Posicional Vertical",qvertpa:{caption:"Avaliação da Acurácia Posicional Vertical Quantitativa",vertaccv:"Valor da Acurácia Posicional Vertical",vertacce:"Explanação da Acurácia Posicional Vertical"}},lineage:{caption:"Linhagem"},srcinfo:{caption:"Informações da Origem",srccite:"Citação de Origem",srcscale:"Denominador da Escala de Origem",typesrc:{caption:"Tipo da Média de Origem",paper:"Papel",stableBaseMaterial:"Material base estável",microfiche:"Microficha",microfilm:"Microfilme",audiocassette:"Cassete de áudio",chart:"Gráfico",filmstrip:"Tira de filme",transparency:"Transparência",videocassette:"Video cassette",videodisc:"Disco de vídeo",videotape:"Vídeo tape",physicalModel:"Modelo físico",computerProgram:"Programa de computador",disc:"Disco",cartridgeTape:"Fita de cartucho",magneticTape:"Fita magnética",online:"Online",cdrom:"CD-ROM",electronicBulletinBoard:"Placa de boletim eletrônica",electronicMailSystem:"Sistema de correio eletrônico"},srctime:"Peródo de Tempo de Origem do Conteúdo",srccurr:"Referência de Atualização da Fonte",srccitea:"Abreviação da Citação de Origem",srccontr:"Contribuição de Origem"},procstep:{caption:"Etapas do Processo",procdesc:"Descrição do Processo",srcused:"Abreviação da Citação de Origem Utilizada",procdate:"Data do Processo",proctime:"Tempo de Processamento",srcprod:"Abreviação da Citação de Origem Produzida",proccont:"Processar Contato"},cloud:"Cobertura de Nuvens"},distinfo:{caption:"Informações de Distribuição",section:{distributor:"Distribuidor",description:"Descrição",orderProcess:"Processo de Classificação",prerequisites:"Pré-requisitos",availability:"Disponibilidade"},distrib:"Distribuidor",resdesc:{caption:"Descrição do Recurso",liveData:"Dados e Mapas Atuais",downloadableData:"Dados Carregáveis",offlineData:"Dados Desconectados",staticMapImages:"Imagens de Mapas Estáticos",sDocument:"Outros Documentos",application:"Aplicativos",geographicService:"Serviços Geográficos",clearingHouse:"Locais de Armazenamento e Distribuição de Dados",mapFiles:"Arquivos de Mapa",geographicActivies:"Atividades Geográficas"},distliab:"Declaração de Responsabilidade de Distribuição",custom:"Processo de Classificação Personalizado",techpreq:"Pré-requisitos Técnicos",availabl:"Disponibilidade"},eainfo:{caption:"Informações de Atributos e Entidades",overview:"Visão Geral da Descrição",eaover:"Visão Geral de Atributo e Entidade",eadetcit:"Citação de Detalhes de Atributos e Entidades"},idinfo:{caption:"Informações de Identificação",section:{timeAndStatus:"Tempo e Status",constraints:"Restrições",contact:"Contato",additional:"Adicional"},citeinfo:"Referência",descript:{caption:"Descrição",sAbstract:"Resumo",purpose:"Finalidade",supplinf:"Informações Suplementares"},timeperd:{caption:"Horário",current:{caption:"Referências Atuais",groundCondition:"Condição Básica",publicationDate:"Data de Publicação"}},status:{caption:"Status",progress:{caption:"Progresso",complete:"Completo",inWork:"Em trabalho",planned:"Planejado"},update:{caption:"Frequência de Atualização e Manutenção",continual:"Contínuo",daily:"Diariamente",weekly:"Semanalmente",monthly:"Mensalmente",annually:"Anualmente",unknown:"Desconhecido",asNeeded:"Conforme Necessário",irregular:"Irregular",nonePlanned:"Sem Planejamento"}},spdom:{caption:"Extensão",bounding:{caption:"Coordenadas Delimitadoras",westbc:"Longitude de Limite Oeste",eastbc:"Longitude de Limite Leste",northbc:"Latitude de Limite Norte",southbc:"Latitude de Limite Sul"}},keywords:{caption:"Palavras-Chaves",theme:"Tema",place:"Posicionar",stratum:"Estrato",temporal:"Temporal",thesaursus:"Dicionário de Sinônimos Associado",delimited:"Palavras-Chaves",themektIsoTopicCategory:"Tópico ISO...",themektIsoTopicDialog:"Tópico ISO",placektGnis:"Sistema de Informações de Nomes Geográfico"},accconst:"Restrições de Acesso",useconst:"Restrições de Uso",ptcontac:"Ponto de Contato do Recurso",browse:{caption:"Procurar Gráfico",browsen:"Procurar URL de Gráfico",browsed:"Procurar Descrição de Arquivo do Gráfico",browset:"Procurar Tipo de Arquivo do Gráfico"},datacred:"Crédito do Conjunto de Dados",secinfo:{caption:"Informações de Segurança",secsys:"Sistema de Classificação de Segurança",secclass:{caption:"Classificação de Segurança",topSecret:"Ultra-secreto",secret:"Secreto",confidential:"Confidencial",restricted:"Restrito",unclassified:"Não classificado",sensitive:"Sensível"},sechandl:"Descrição do Desempenho de Segurança"},sNative:"Ambiente do Conjunto de Dados Nativo",crossref:"Referência Cruzada"},metadata:{idinfo:"Identificação",dataqual:"Qualidade",spdoinfo:"Organização de Dados Espaciais",spref:"Referência Espacial",eainfo:"Entidade e Atributo",distinfo:"Distribuição",metainfo:"Metadados"},metainfo:{caption:"Informações do Metadados",section:{dates:"Datas de Metadados",contact:"Contato de Metadados",standard:"Padrões de Metadados",additional:"Adicional"},metd:"Metadados",metrd:"Data de Revisão do Metadados",metfrd:"Data Futura de Revisão do Metadados",metstdn:"Nome Padrão de Metadados",metstdv:"Versão Padrão de Metadados",metac:"Restrições de Acesso dos Metadados",metuc:"Restrições de Uso de Metadados",metsi:{caption:"Informações de Segurança do Metadados",metscs:"Sistema de Classificação de Segurança do Metadados",metsc:"Classificação de Segurança do Metadados",metshd:"Descrição do Desempenho de Segurança do Metadados"}},spref:{caption:"Informações de Referência Espacial",horizsys:{caption:"Sistema de Coordenadas Horizontais",geograph:{caption:"Geográfico",latres:"Resolução da Latitude",longres:"Resolução de Longitude",geogunit:{caption:"Unidades das Coordenadas Geográficas",decimalDegrees:"Graus Decimais",decimalMinutes:"Minutos Decimais",decimalSeconds:"Segundos decimais",degreesAndDecimalMinutes:"Graus e minutos decimais",degreesMinutesAndDecimalSeconds:"Graus, minutos e segundos decimais",radians:"Radianos",grads:"Grads"}},planar:{caption:"Planar"},local:{caption:"Local",localdes:"Descrição do Local",localgeo:"Informação de Georreferência Local"},geodetic:{caption:"Modelo Geodésico",horizdn:{caption:"Nome do Datum Horizontal",nad83:"North American Datum de 1983",nad27:"North American Datum de 1927"},ellips:{caption:"Nome do Elipsóide",grs80:"Sistema de Referência Geodésico 80",clarke1866:"Clarke 1866"},semiaxis:"Semi-eixo maior",denflat:"Denominador da Razão de Achatamento"}},vertdef:{caption:"Sistema de Coordenadas Vertical",altsys:{caption:"Sistema de Altitude",altdatum:{caption:"Nome do Datum de Altitude",navd88:"North American Vertical Datum de 1988",ngvd29:"National Geodetic Vertical Datum de 1929"},altres:"Resolução da Altitude",altunits:{caption:"Unidades de Distância da Altitude",meters:"Metros",feet:"Pés"},altenc:{caption:"Método de Codificação de Altitude",explicit:"Coordenada de elevação explícita incluída com coordenadas horizontais",implicit:"Coordenadas implícitas",attribute:"Valores de atributo"}},depthsys:{caption:"Sistema de Profundidade",depthdn:{caption:"Nome do Datum de Profundidade",option1:"Superfície local",option2:"Gráfico de datum; datum para redução ressonante",option3:"Curso astronômico mais baixo",option4:"Curso astronômico mais alto",option5:"Média de água baixa",option6:"Média de água alta",option7:"Média de nível do mar",option8:"Datum de pesquisa do solo",option9:"Média da fonte de água baixa",option10:"Média da fonte de água alta",option11:"Média da maré de água baixa",option12:"Média da maré de água alta",option13:"Média da água mais baixa inferior",option14:"Média da fonte de água mais baixa inferior",option15:"Média da água alta superior",option16:"Média da água baixa superior",option17:"Média da água alta inferior",option18:"Corrente da fonte",option19:"Trópico da água baixa inferior",option20:"Corrente da maré",option21:"Água alta",option22:"Água alta mais alta",option23:"Água baixa",option24:"Datum de água baixa",option25:"Água baixa mais baixa",option26:"Água baixa inferior",option27:"Água baixa normal mais baixa",option28:"Média de nível da maré",option29:"Água baixa e nascente Indiana",option30:"Água alta completa e carga",option31:"Água baixa completa e carga",option32:"Datum Columbia River",option33:"Água baixa de Datum da Costa do Golfo",option34:"Fontes equatoriais de água baixa",option35:"Maré astronômica mais baixa aproximada",option36:"Nenhuma correção"},depthres:"Resolução da Profundidade",depthdu:{caption:"Unidades de Distância de Profundidade",meters:"Metros",feet:"Pés"},depthem:{caption:"Método de Codificação de Profundidade",explicit:"Coordenada de profundidade explícita incluído com coordenadas horizontais",implicit:"Coordenadas implícitas",attribute:"Valores de atributo"}}}},timeinfo:{caption:"Informações do Período de Tempo",sngdate:"Única Data",mdattim:"Múltiplas Data",rngdates:"Intervalo de Data",caldate:"Data",time:"Tempo",begdate:"Data Inicial",begtime:"Tempo Inicial",enddate:"Data Final",endtime:"Hora Final"}});