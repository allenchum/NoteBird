export class NotePin{
    constructor(p1=[0,0],p2=[0,0]){
        this.p1 = p1;
        this.p2 = p2;   
    }

    p1:number[] = [0,0];
    p2:number[] ;
    dragging: boolean = false;
    length:number;
    style: { [s:string]: string };
    angle: number;
    title: string = 'Title';
    content: string ='Content';
    textboxUpright:{ [s:string]: string };
    textboxPosition:{ [s:string]: string };

    
    select(e){
        let point = this.getCoords(e);
        if(point=this.p2){
            this.dragging = true;
            this.move(e);
        }else{
            return;
        }
    }
    move(e){
        if(!this.dragging){
            return;
        }
        this.p2 = this.getCoords(e);
        this.setData(this.p1,this.p2);
    }
    drop(e){
        this.p2 = this.getCoords(e);
        this.setData(this.p1,this.p2);
        this.dragging = false;
    }
    setData(p1,p2){
        this.length = this.getLength(p1,p2);
        this.angle = this.getRotateAngle(p1,p2);
        
        this.style = {
            'height':this.length.toString().concat("px"),
            'width':'3px',
            'background-color':'red',
            'position':'absolute',
            'top': (p1[1]-window.innerHeight*0.137).toString().concat("px"),
            'left':(p1[0]-window.innerWidth*0.165).toString().concat("px"),
            'transform':`rotate(${this.angle.toString()}deg)`,
            'transform-origin':'0% 0%',
        }

        this.upRighting(p1,p2);
        this.textboxPositioning(p1,p2);
    }
    getLength(p1,p2){
        let dx = p2[0]-p1[0],
            dy = p2[1]-p1[1];
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
    getRotateAngle(p1,p2){
        let dx = p2[0]-p1[0],
            dy = p2[1]-p1[1];

        let atan = Math.atan(dx/dy)*180/Math.PI,
            angle = 0;

        if(dy<0){
            angle = 180-atan;
        }else{
            angle = -atan;
        }
        this.angle = atan;
        return angle;
    }
    getCoords(e) {
        return [(e.touches || [e])[0].clientX, (e.touches || [e])[0].clientY];
      }

    upRighting(p1,p2){
        if(p2[0]-p1[0]>0 && p2[1]-p1[1]>0){
            let reverseAngle = Math.sqrt(Math.pow(this.angle,2))
            this.textboxUpright={
                'transform':`rotate(${reverseAngle.toString()}deg)`,
               }
            }else{
           this.textboxUpright={
            'transform':`rotate(-${this.angle.toString()}deg)`,
           }
        }
    }

    textboxPositioning(p1,p2){

        let x:number=5, y:number=5;
        if(p1[0]<p2[0]){
           x+=20;
        }else if(p1[0]>p2[0]){
            x-=120;
        }
        if(p2[1]>p1[1]){
            y += 10;
        }else if(p2[1]<p1[1]){
            y -= 50;
        }
        this.textboxPosition = {
            'top':  `${y}px`,
            'left': `${x}px`
        }
    }

}