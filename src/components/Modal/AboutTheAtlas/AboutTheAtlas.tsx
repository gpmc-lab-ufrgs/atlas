import React from 'react';

import { ModalContainer } from '@components/Modal';

const AboutTheAtlas = () => {
  return (
    <ModalContainer title="About the Atlas">
      <p>
        Este site visa apoiar o desenvolvimento de estratégias baseadas em dados e métodos avançados que são usados para
        entender como o comportamento humano (por exemplo, movimentos, gastos) molda a prosperidade econômica.
      </p>
      <p>
        O Atlas é baseado em pesquisas acadêmicas recentes que revelam o quanto compreender padrões de movimento de uma
        comunidade é crucial para entender seu crescimento econômico e sua mobilidade. Segundo os resultados dessas
        pesquisas, locais com padrões de movimento mais diversificados são mais propensos a ter maior crescimento
        econômico. São insights como esse que o Atlas pretende tornar mais acessíveis ao público em geral, não se
        restringindo ao público acadêmico.
      </p>
      <p>
        A equipe envolvida no Atlas utiliza avançados métodos de análise de dados para ajudar empreendedores e
        autoridades a reduzir a incerteza na tomada de decisões. O mapa atual pretende fornecer insights para
        proprietários de pequenas empresas e ajudá-los a tomar decisões informadas sobre o local para iniciar seu novo
        negócio ou filial.
      </p>
    </ModalContainer>
  );
};

export default AboutTheAtlas;
