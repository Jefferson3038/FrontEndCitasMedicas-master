export class Citas {
    CtCodigo: number = 0;
    PacCodigo: number = 0;
    CtDescripcion: string = "";
    DocCodigo: number = 0;
    CtEstatus: string = "A";
    CtHorarioInicial: Date = new Date();
    CtHorarioFinal: Date = this.CtHorarioInicial;

}