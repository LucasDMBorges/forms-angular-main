import { ConsultaCepService } from "./../service/consulta-cep.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  constructor(private router: Router, private cepService: ConsultaCepService) {}

  ngOnInit(): void {}

  cadastrar(form: NgForm) {
    if (form.valid) this.router.navigate(["./sucesso"]);
    else alert("Fomulário inválido");
  }

  consultaCep(ev: any, f: NgForm) {
    const cep = ev.target.value;
    if (cep)
      this.cepService.getConsultaCep(cep).subscribe((res) => {
        console.log(res);
        this.populandoEndereco(res, f);
      });
  }

  populandoEndereco(dados: any, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      complemneto: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  }
}
