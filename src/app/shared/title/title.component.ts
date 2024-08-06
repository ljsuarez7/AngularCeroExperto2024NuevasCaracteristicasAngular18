import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  template: `
    <!-- <h1 class="text-3xl mb-5">{{title}} - {{withShadow}}</h1> -->
    <h1 class="text-3xl mb-5">{{title}}</h1>
  `,
  styles: ``
})
export class TitleComponent {

  @Input({required: true}) title!: string;

  //Con el transform hacemos q se pueda mandar true solo poniendo el nombre del input en el componente
  //Si lo tiene será true, sino será false
  // @Input({transform: booleanAttribute}) withShadow: boolean = false;

}
