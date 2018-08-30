import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@Angular/forms';
import { AuthService } from '../../../config/auth.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Mensagem, MENSAGENS } from '../../../shared/models';
import { UserService } from '../../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  public mensagem: string;
  public mensagens: Mensagem[] = MENSAGENS;

  constructor(public autenticacao: AuthService, private userService: UserService) { }

  ngOnInit() {}

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): string {
   this.autenticacao.loginWithEmail(
      this.formulario.value.email,
      this.formulario.value.senha
    ).then(() => {
      UserService.emailCurrentUser = this.formulario.value.email;
      localStorage.setItem('idUser', btoa(this.formulario.value.email));
    });

    const continua = new Subject;
    const acompanhamentoUpload = interval(1500).pipe(takeUntil(continua))
        .subscribe(() => {
          this.mensagem = this.traduzMensagem(this.autenticacao.mensagem);
          continua.next(false);
        });
    return this.mensagem;
  }

  traduzMensagem(mensagemServidor: string): string {
    for (let i = 0; i < this.mensagens.length; i++) {
      if (this.mensagens[i].msgUsa === mensagemServidor) {
        return this.mensagens[i].msgBr;
      }
    }
  }
}
