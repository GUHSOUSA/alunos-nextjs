"use client"
import { AlunosList } from '@/components/alunoList';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import AlunoForm from './components/aluno-form';


type Alunos = {
  id: string;
  nome: string;
  nota1: string;
  nota2: string;
  idade: string;
};

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [alunos, setAlunos] = useState<Alunos[]>([]);
  const [filteredAlunos, setFilteredAlunos] = useState<Alunos[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setidade] = useState('');
  const [nota1, setnota1] = useState('');
  const [nota2, setnota2] = useState('');

  const router = useRouter();
  const { toast } = useToast()
  useEffect(() => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('alunos');
      const data = result ? JSON.parse(result) : [];
      setAlunos(data);
      setFilteredAlunos(data);
    };
    fetchData();
  }, [])



  useEffect(() => {
    const filtered = alunos.filter(aluno => aluno.id.toLowerCase().includes(searchInput.toLowerCase()));
    setFilteredAlunos(filtered);
  }, [searchInput]);

  const registrarAluno = async () => {
    
    // aqui criei uma data com os campos 
      const aluno: Alunos = {
          id: Math.random().toString(),
          nome,
          idade,
          nota1,
          nota2
      };

      // e salvei no asyncStorage
      try{
      const alunoId = await AsyncStorage.getItem('alunos');
      const alunos = alunoId ? JSON.parse(alunoId): []
      alunos.push(aluno);
      await AsyncStorage.setItem('alunos', JSON.stringify(alunos));
      window.location.reload();
      }catch (error){
        console.log("Erro ao adicionar aluno")
      }
    }


  return (
    <div className='bg-white w-full h-full'>
     
      <AlunoForm initialData={filteredAlunos} />
    </div>
  )
}
