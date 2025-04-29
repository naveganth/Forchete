use regex::Regex;

// Substituições para manter os nomes de bairros consistentes.
const SUBSTITUICOES: [(&'static str, (&'static str, &'static str)); 5] = [
    ("1", ("um", "I")),
    ("2", ("dois", "II")),
    ("3", ("três", "III")),
    ("4", ("quatro", "IV")),
    ("5", ("cinco", "V"))
];

// Regexes necessários para encontrar cada região.
const REGEXES: [(&'static str, &'static str); 67] = [
    ("Açaí",                     r#"((?:bairro\s{1}(?:d[oa]\s{1})?)açaí[\,\. ])"#),
    ("Alvorada",                 r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?alvorada[\,\. ])"#),
    ("Amazonas",                 r#"((?:bairro\s{1}(?:d[oa]\s{1})?)amazonas[\,\. ])"#),
    ("Araxá",                    r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?araxá[\,\. ])"#),
    ("Beirol",                   r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?beirol[\,\. ])"#),
    ("Bella Ville",              r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?bella ville[\,\. ])"#),
    ("Bioparque",                r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?bioparque[\,\. ])"#),
    ("Boné Azul",                r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?boné azul[\,\. ])"#),
    ("Brasil Novo",              r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?brasil novo[\,\. ])"#),
    ("Buritis",                  r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?buritis[\,\. ])"#),
    ("Buritizal",                r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?buritizal[\,\. ])"#),
    ("Cabralzinho",              r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?cabralzinho[\,\. ])"#),
    ("Cajari",                   r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?cajari[\,\. ])"#),
    ("Central",                  r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?central[\,\. ])"#),
    ("Chefe Clodoaldo",          r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?chefe clodoaldo[\,\. ])"#),
    ("Cidade Nova",              r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?cidade nova[\,\. ])"#),
    ("Congós",                   r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?congós[\,\. ])"#),
    ("Coração",                  r#"((?:bairro\s{1}(?:d[oa]\s{1})?)coração[\,\. ])"#),
    ("Fazendinha",               r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?fazendinha[\,\. ])"#),
    ("Goiabal",                  r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?goiabal[\,\. ])"#),
    ("Igarapé da Fortaleza",     r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?igarapé da fortaleza[\,\. ])"#),
    ("Ilha Mirim",               r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?ilha mirim[\,\. ])"#),
    ("Infraero 1",               r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?infraero 1[\,\. ])"#),
    ("Infraero 2",               r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?infraero 2[\,\. ])"#),
    ("Ipê",                      r#"((?:bairro\s{1}(?:d[oa]\s{1})?)ipê[\,\. ])"#),
    ("Jardim América",           r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?jardim américa[\,\. ])"#),
    ("Jardim das Acácias",       r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?jardim das acácias[\,\. ])"#),
    ("Jardim Equatorial",        r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?jardim equatorial[\,\. ])"#),
    ("Jardim Felicidade I",      r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?jardim felicidade I[\,\. ])"#),
    ("Jardim Felicidade II",     r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?jardin felicidade II[\,\. ])"#),
    ("Jardim Marco Zero",        r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?jardim marco zero[\,\. ])"#),
    ("Jesus de Nazaré",          r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?jesus de nazaré[\,\. ])"#),
    ("KM 9",                     r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?km 9[\,\. ])"#),
    ("Lago da Vaca",             r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?lago da vaca[\,\. ])"#),
    ("Lagoa Azul",               r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?lagoa azul[\,\. ])"#),
    ("Laguinho",                 r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?laguinho[\,\. ])"#),
    ("Macapaba",                 r#"((?:bairro\s{1}(?:d[oa]\s{1})?|(?:conjunto\s{1})?(?:habitacional\s{1})?(?:residencial\s{1})?)macapaba[\,\. ])"#),
    ("Marabaixo 1",              r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?marabaixo 1[\,\. ])"#),
    ("Marabaixo 2",              r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?marabaixo 2[\,\. ])"#),
    ("Marabaixo 3",              r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?marabaixo 3[\,\. ])"#),
    ("Marabaixo 4",              r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?marabaixo 4[\,\. ])"#),
    ("Morada das Palmeiras",     r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?morada das palmeiras[\,\. ])"#),
    ("Muca",                     r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?muca[\,\. ])"#),
    ("Murici",                   r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?murici[\,\. ])"#),
    ("Nova Esperança",           r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?nova esperança[\,\. ])"#),
    ("Novo Buritizal",           r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?novo buritizal[\,\. ])"#),
    ("Novo Horizonte",           r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?novo horizonte[\,\. ])"#),
    ("Pacoval",                  r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?pacoval[\,\. ])"#),
    ("Palácio das Águas",        r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?palácio das àguas[\,\. ])"#),
    ("Pantanal",                 r#"((?:bairro\s{1}(?:d[oa]\s{1})?)pantanal[\,\. ])"#),
    ("Parque Aeroportuário",     r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?parque aeroportuário[\,\. ])"#),
    ("Parque dos Jardins",       r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?parque dos jardins[\,\. ])"#),
    ("Pedrinhas",                r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?pedrinhas[\,\. ])"#),
    ("Perpétuo Socorro",         r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?perpétuo socorro[\,\. ])"#),
    ("Renascer",                 r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?renascer[\,\. ])"#),
    ("Santa Inês",               r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?santa inês[\,\. ])"#),
    ("Santa Rita",               r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?santa rita[\,\. ])"#),
    ("São Lázaro",               r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?são lázaro[\,\. ])"#),
    ("Sol Nascente",             r#"((?:bairro\s{1}(?:d[oa]\s{1})?)sol nascente[\,\. ])"#),
    ("Trem",                     r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?trem[\,\. ])"#),
    ("Universidade",             r#"((?:bairro\s{1}(?:d[oa]\s{1})?)universidade[\,\. ])"#),
    ("Vale Verde",               r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?vale verde[\,\. ])"#),
    ("Zerão",                    r#"((?:bairro\s{1}(?:d[oa]\s{1})?)?zerão[\,\. ])"#),
    ("Açucena",                  r#"((?:bairro\s{1}(?:d[oa]\s{1})?|(?:conjunto\s{1})?(?:habitacional\s{1})?(?:residencial\s{1})?)açucena[\,\. ])"#),
    ("Mucajá",                   r#"((?:bairro\s{1}(?:d[oa]\s{1})?|(?:conjunto\s{1})?(?:habitacional\s{1})?(?:residencial\s{1})?)mucajá[\,\. ])"#),
    ("São José",                 r#"((?:bairro\s{1}(?:d[oa]\s{1})?|(?:conjunto\s{1})?(?:habitacional\s{1})?(?:residencial\s{1})?)são josé[\,\. ])"#),
    ("Miracema",                 r#"((?:bairro\s{1}(?:d[oa]\s{1})?|(?:conjunto\s{1})?(?:habitacional\s{1})?(?:residencial\s{1})?)miracema[\,\. ])"#),
];

// Função que busca as localidades dentro de um texto
// Primeiro inicializa as listas mutáveis
// Então realiza as substituições para homogeneizar o texto
// Então procura por cada bairro utilizando os regexes.
// Por fim retorna a lista.
pub fn pegar_localidade(conteudo: String) -> Vec<String> {
    let mut encontradas: Vec<String> = Vec::new();
    let mut conteudo = conteudo;

    for (numero, (sub1, sub2)) in SUBSTITUICOES {
        conteudo = conteudo.replace(sub1, numero);
        conteudo = conteudo.replace(sub2, numero);
    }

    for (localidade, padrao) in REGEXES {
        let regex = Regex::new(padrao).unwrap();
        let encontrou_bairro =  !regex.find_iter(conteudo.to_lowercase().as_str()).map(|a| { a.as_str() }).collect::<Vec<&str>>().is_empty();
        if encontrou_bairro {
            encontradas.push(localidade.to_string());
        }
    }
    encontradas
}

