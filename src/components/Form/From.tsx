import React, { ReactNode } from 'react';



interface FormProps {
    handleSubmit: (data:any)=> void;
    children: ReactNode;
}

const Form: React.FC<FormProps> = (props) => {

      return (
        <form onSubmit={props.handleSubmit} autoComplete="on">
            {props.children}
        </form>
      )
    }
    
export default Form;
