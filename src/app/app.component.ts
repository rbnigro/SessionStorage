import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model : ElementRef |undefined;
  alunoObj: Aluno = new Aluno();
  alunoList: Aluno[] = [];

  ngOnInit(): void {
      const localData = localStorage.getItem("sessaoEmAndamento");
      if (localData != null) {
        this.alunoList = JSON.parse(localData);
      }
  }

  openModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel() {
    this.alunoObj = new Aluno();
    if(this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onEdit(item: Aluno) {
    this.alunoObj = item;
    this.openModel();
  }

  onDelete(item: Aluno) {
    const isDelete = confirm("Confirma a exclusão?");
    if(isDelete) {
      const currentRecord = this.alunoList.findIndex(procura=> procura.id === this.alunoObj.id);
      this.alunoList.splice(currentRecord, 1);
      localStorage.setItem('sessaoEmAndamento', JSON.stringify(this.alunoList));
    }
  }

  atualizaAluno() {
    const currentRecord = this.alunoList.find(procura=> procura.id === this.alunoObj.id);
    if(currentRecord != undefined) {
      currentRecord.nome = this.alunoObj.nome;
      currentRecord.celular = this.alunoObj.celular;
      currentRecord.email = this.alunoObj.email;
      currentRecord.cidade = this.alunoObj.cidade;
      currentRecord.uf = this.alunoObj.uf;
      currentRecord.cep = this.alunoObj.cep;
      currentRecord.endereco = this.alunoObj.endereco;
    };
    localStorage.setItem('sessaoEmAndamento', JSON.stringify(this.alunoList));
    this.closeModel();
  }

  saveAluno() {
    debugger;
    const isLocalPresent = localStorage.getItem("sessaoEmAndamento");
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.alunoObj.id = oldArray.length + 1;
      oldArray.push(this.alunoObj);
      this.alunoList = oldArray
      localStorage.setItem('sessaoEmAndamento', JSON.stringify(oldArray));
    } else {
      const newArray = [];
      newArray.push(this.alunoObj);
      this.alunoObj.id = 1;
      this.alunoList = newArray;
      localStorage.setItem('sessaoEmAndamento', JSON.stringify(newArray));
    }
    this.closeModel();
  }
}


export class Aluno {
  id: number;
  nome: string;
  celular: string;
  email: string;
  cidade: string;
  uf: string;
  cep: string;
  endereco: string;

  constructor() {
    this.id = 0;
    this.nome = '';
    this.celular = '';
    this.email = '';
    this.cidade = '';
    this.uf = '';
    this.cep = '';
    this.endereco = '';
  }
}
