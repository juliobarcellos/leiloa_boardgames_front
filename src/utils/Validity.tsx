
export default function validaDataNascimento(inputEvent: React.ChangeEvent<HTMLInputElement>){
    let mensagem= ''
    if(inputEvent.target.value){
        const dataRecebida = new Date(inputEvent.target.value.toString())

        if(maiorQue18(dataRecebida)){
            mensagem='Apenas maiores de 18 anos podem efetuar cadastro no site.'
        }

        inputEvent.target.setCustomValidity(mensagem)
    }
}

function maiorQue18 (data: Date){
    const dataAtual = new Date();
    const dataMais18 = new Date (data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate ())

    return dataMais18 <= dataAtual
}

function validaCPF(inputEvent: React.ChangeEvent<HTMLInputElement>) {
    const cpfFormatado = inputEvent.target.value.replace(/\D/g, '')
    let mensagem = ''

    if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido.'
    }

    inputEvent.target.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf: string) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    let cpfValido = true

    valoresRepetidos.forEach(valor => {
        if(valor == cpf) {
            cpfValido = false
        }
    })

    return cpfValido
}

function checaEstruturaCPF(cpf: string) {
    const multiplicador = 10

    return checaDigitoVerificador(cpf, multiplicador)
}

function checaDigitoVerificador(cpf: string, multiplicador: number): boolean {
    if(multiplicador >= 12) {
        return true
    }

    let multiplicadorInicial = multiplicador
    let soma = 0
    const cpfSemDigitos = cpf.substring(0, multiplicador - 1).split('')
    const digitoVerificador = cpf.charAt(multiplicador - 1)
    for(let contador = 0; multiplicadorInicial > 1 ; multiplicadorInicial--) {
        let stringNumber: number = +cpfSemDigitos[contador]
        soma = soma + stringNumber * multiplicadorInicial
        contador++
    }

    if(+digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }

    return false
}

function confirmaDigito(soma: number) {
    return 11 - (soma % 11)
}