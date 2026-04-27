import { Component, signal } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas: Tarefa[] = [];

  constructor(private http: HttpClient) {
    this.READ_tarefas();
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.arrayDeTarefas.unshift(novaTarefa);
  }

  READ_tarefas() {
    this.http.get<Tarefa[]>('https://backend-api-1vng.onrender.com/api/todos')
      .subscribe((dados) => {
        this.arrayDeTarefas = dados;
      });
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    this.arrayDeTarefas.splice(this.arrayDeTarefas.indexOf(tarefaAserRemovida), 1);
  }
}
