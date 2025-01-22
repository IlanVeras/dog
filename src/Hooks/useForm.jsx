import React from "react";


const types = {
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Preencha um email válido"
    },
    password: {
      regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      message: "A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres"
    },
    number: {
      regex: /^\d+$/,
      message: "Utilize Números Apenas"
    }
}

//função que verifica os campos de emal/username e password
//@params valor do input
export default function useForm(type){
    //estado que guarda o valor do input
    const [value,setValue] = React.useState('')
    //estado que guarda o valor da mensagem de erro
    const [error,setError] = React.useState(null)

    function validate(value) {
        //se nada for passado no input a verificação não será feita
        if (type === false) return true;
        //caso o valor do input esteja vazio a mensagem de erro irá aparecer
        if (value.length === 0) {
          setError('Preencha um valor.');
          return false;
        } 
        //se o valor existir e ele não passar pela verificação do regex a mensagem de erro do regex irá aparecer
        else if (types[type] && !types[type].regex.test(value)) {
          setError(types[type].message);
          return false;
        } else {
          //se nada acima acontecer o erro não aparecerá
          setError(null);
          return true;
        }
      }

      //função que permite escerever no input
      function onChange({ target }) {
        //caso exista um erro prévio ele irá sumir assim que a informação estiver sendo colocada
        if (error) validate(target.value);
        setValue(target.value);
      }

    return{
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value)
    }
}