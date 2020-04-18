import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { DataService } from '../data.service';
import { ActivatedRoute,Router} from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent implements OnInit {
  menu : Menu; //= {
    //_id: '',
    // menuName: '',
    // menuDesc: '',
    // duration: null,
    // price: null
  // };
  id ='';
  error = false;
  update = false;

 menuForm = this.fb.group({
   menuName:['',[Validators.required]],
   menuDesc:['',[Validators.required]],
   duration:['',[Validators.required,Validators.min(1),Validators.max(45)]],
   price: ['',[Validators.required]], 
   check:[false,[Validators.requiredTrue]]
 })

 menuName = this.menuForm.get("menuName");
 menuDesc = this.menuForm.get("menuDesc");
 duration = this.menuForm.get("duration");
 price = this.menuForm.get("price");
 check = this.menuForm.get("check");

  constructor(
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // jika ada parameter id di URL
      if (params.get('id')) {
        this.id = params.get('id');

        this.ds.getMenu(this.id).subscribe(
          response => {
            this.menu = response as Menu;
            //this.menu = response;
            this.update = true;

            this.menuForm.get("menuName").setValue(this.menu.menuName);
            this.menuForm.get("menuDesc").setValue(this.menu.menuDesc);
            this.menuForm.get("duration").setValue(this.menu.duration);
            this.menuForm.get("price").setValue(this.menu.price);
            
          },
          err => {
            console.log(err);
            //this.error = true;
          }
        );
        } 
    });
  }//end ngOninit

  //postMenu() {
    //this.ds.postMenu(this.menu).subscribe(response => {
      // tampilkan notifikasi
     // this.router.navigate(['/home']);
    //});
  //}
  postMenu() {
    const param = this.menuForm.value;
    delete param.check;

    this.ds.postMenu(this.menuForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(["home"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteMenu() {
    this.ds.deleteMenu(this.menu).subscribe(
      response => {
        // tampilkan notifikasi
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }


  updateMenu() {
    this.ds.updateMenu(this.id, this.menuForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(["home"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  




}//end of all
