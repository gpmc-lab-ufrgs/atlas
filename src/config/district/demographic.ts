import { formatValue } from '@utils/formatValue';
import { MapPropsSectionType } from '@customTypes/mapProps';

const demographicProps: MapPropsSectionType = {
  title: 'Demográfica (D)',
  content: [
    {
      label: 'OBSERVED',
      title: 'Número de mortes observadas por causas evitáveis',
      description: 'Número de mortes observadas por causas evitáveis de 5 a 74 anos (2013 a 2017) - GeoSES',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
    {
      label: 'EXPECTED',
      title: 'Número de mortes esperadas',
      description:
        'Número de mortes esperadas para a distribuição da população de acordo com sexo e grupos de labelade - GeoSES',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
    {
      label: 'RR_PREV',
      title: 'Risco relativo de mortalidade por causas evitáveis',
      description:
        'Risco relativo de mortallabelade por causas evitáveis de 5 a 74 anos por padronização indireta por sexo e labelade - GeoSES',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
    {
      label: 'IDHM',
      title: 'Índice de Desenvolvimento Humano (IDH)',
      description: 'IDHM - Índice de desenvolvimento humano municipal (2010) - IBGE cidades',
      format: (e: any) => formatValue(e, 'float_3'),
      type: 'none',
      nestedData: [
        {
          label: 'IDHM',
          title: 'Índice de Desenvolvimento Humano (IDH)',
          description: 'IDHM - Índice de desenvolvimento humano municipal (2010) - IBGE cidades',
          format: (e: any) => formatValue(e, 'float_3'),
          type: 'none',
        },
        {
          label: 'HDI_educ',
          title: 'Índice de Desenvolvimento Humano, dimensão educacional',
          description: 'Índice de Desenvolvimento Humano, dimensão educacional - GeoSES',
          format: (e: any) => formatValue(e, 'float_3'),
          type: 'none',
        },
        {
          label: 'HDI_long',
          title: 'Índice de Desenvolvimento Humano, dimensão longevidade',
          description: 'Índice de Desenvolvimento Humano, dimensão longevidade - GeoSES',
          format: (e: any) => formatValue(e, 'float_3'),
          type: 'none',
        },
      ]
    },
    {
      label: 'HDI_educ',
      title: 'Índice de Desenvolvimento Humano, dimensão educacional',
      description: 'Índice de Desenvolvimento Humano, dimensão educacional - GeoSES',
      format: (e: any) => formatValue(e, 'float_3'),
      type: 'none',
    },
    {
      label: 'HDI_long',
      title: 'Índice de Desenvolvimento Humano, dimensão longevidade',
      description: 'Índice de Desenvolvimento Humano, dimensão longevidade - GeoSES',
      format: (e: any) => formatValue(e, 'float_3'),
      type: 'none',
    },
    {
      label: 'GeoSESed',
      title: 'Dimensão de educação',
      description: 'Dimensão de educação (%) - GeoSES',
      format: (e: any) => formatValue(e, 'percent'),
      type: 'bar',
    },
    {
      label: 'Area_Territorial_km',
      title: 'Área territorial',
      description: 'Área Territorial Brasileira km² (2020) - IBGE cidades',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
    {
      label: 'Populacao_Estimada',
      title: 'População',
      description: 'População estimada - pessoas (2021) - IBGE cidades',
      format: (e: any) => formatValue(e, 'population'),
      type: 'none',
    },
    {
      label: 'Densidade_demografica',
      title: 'Densidade demográfica',
      description: 'Densidade demográfica - hab/km² (2010) - IBGE cidades',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
    {
      label: 'Escolarizacao',
      title: 'Escolarização de 6 a 14 anos',
      description: 'Escolarização de 6 a 14 anos - % (2010) - IBGE cidades',
      format: (e: any) => formatValue(e, 'percent'),
      type: 'bar',
    },
    {
      label: 'Mortalidade_infantil',
      title: 'Mortalidade infantil',
      description: 'Mortalidade infantil - óbitos por mil nascidos vivos (2019) - IBGE cidades',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
    {
      label: 'Populacao_no_ultimo_censo(2010)',
      title: 'População',
      description: 'População no último censo (2010) - IBGE cidades',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
    {
      label: 'Frota_2020',
      title: 'Frota de veículos',
      description:
        'Frota de automóveis, caminhonetes, camionetas, motocicletas, motonetas e utilitários no ano 2020 - Mobilidados',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
    {
      label: 'DISTCAPU(1998)',
      title: 'Distância à capital estadual para os municípios',
      description:
        'Distância à capital estadual para os municípios da divisão político administrativa vigente em 2000 - IPEA',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
    {
      label: 'POPM(2010)',
      title: 'População Masculina',
      description: 'População Masculina - IBGE',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
    {
      label: 'POPF(2010)',
      title: 'População Feminina',
      description: 'População Feminina - IBGE',
      format: (e: any) => formatValue(e, 'float_2'),
      type: 'none',
    },
  ],
};

export default demographicProps;
