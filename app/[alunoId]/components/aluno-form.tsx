type Alunos = {
    id: string;
    nome: string;
    nota1: string;
    nota2: string;
    idade: string;
};
 interface AlunoProps {
    initialData: Alunos[]
 }
const AlunoForm: React.FC<AlunoProps> = ({
    initialData
}) => {
    return ( 
        <div>
            {initialData.id}
        </div>
     );
}
 
export default AlunoForm;