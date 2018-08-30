import { Directive, ElementRef, Input, HostListener, Renderer } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[IkMask]'
})
export class IkMaskDirective {

  onTouched: any;
  onChange: any;

  @Input('IkMask') IkMask: string;

  constructor(
    private el: ElementRef,
    private render: Renderer
  ) {}

  writeValue(value: any): void {
    if (value) {
      this.render.setText(this.el.nativeElement, this.aplicarMascara(value));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    const valor = $event.target.value.replace(/\D/g, '');
    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange = valor;
      return;
    }

    const pad = this.IkMask.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length) {
      this.onChange = valor;
    }

    $event.target.value = this.aplicarMascara(valor);
  }
/*
  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.IkMask.length) {
      return;
    }
    this.onChange ='';
    $event.target.value = '';
  }
*/
  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valor
   * @return string
   */
  aplicarMascara(valor: string): string {
    valor = valor.replace(/\D/g, '');
    const pad = this.IkMask.replace(/\D/g, '').replace(/9/g, '_');
    const valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;

    valor = '';
    for (let i = 0; i < this.IkMask.length; i++) {
      // tslint:disable-next-line:radix
      if (isNaN(parseInt(this.IkMask.charAt(i)))) {
        valor += this.IkMask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;
  }
}
