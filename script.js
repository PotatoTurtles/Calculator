let display = document.querySelector("#display");
let clear = document.querySelector("#clear");
let negative = document.querySelector("#negative");
let percent = document.querySelector("#percent");
let divide = document.querySelector("#divide");
let one = document.querySelector("#one");
let two = document.querySelector("#two");
let three = document.querySelector("#three");
let multiply = document.querySelector("#multiply");
let four = document.querySelector("#four");
let five = document.querySelector("#five");
let six = document.querySelector("#six");
let minus = document.querySelector("#minus");
let seven = document.querySelector("#seven");
let eight = document.querySelector("#eight");
let nine = document.querySelector("#nine");
let plus = document.querySelector("#plus");
let zero = document.querySelector("#zero");
let dlt = document.querySelector("#delete");
let equals = document.querySelector("#equals");

display.textContent='0';

let holdValues = [];

function includeValue(inputValue){
    if(typeof inputValue == 'string'){
        if(holdValues.length){
            if(typeof holdValues[holdValues.length-1]=="string"){
                if(inputValue!='%'){
                    holdValues[holdValues.length-1]=reverseOperator(inputValue)
                }
            }
            else{
                if(inputValue=='%'){
                    holdValues[holdValues.length-1]/=100;
                }
                else{
                    holdValues.push(inputValue);
                }
            }
        }
        else{
            holdValues.push(inputValue);
        }
    }
    else if(typeof inputValue == 'number'){
        if(holdValues.length){
            if(typeof holdValues[holdValues.length-1]=="number"){
                holdValues[holdValues.length-1]=combineNum(inputValue);
            }
            else{
                holdValues.push(inputValue);
                
            }
        }
        else{
            holdValues.push(inputValue);
        }
    }
    showCalculation();
}
function reverseOperator(inputValue){
    if(inputValue=='-'||inputValue=='+'){
        if(inputValue=='-'){
            if(holdValues[holdValues.length-1]=='-'){
                return '+'
            }
            return '-'
        }
        return holdValues[holdValues.length-1]
    }
    else if(inputValue=='*'||inputValue=='/'){
        return inputValue
    }
    
}
function combineNum(inputValue){
    return holdValues[holdValues.length-1]*10+inputValue
}
function showCalculation(){
    if(holdValues.length==0){
        display.textContent="0";
    }
    else{
        let show = holdValues.reduce((total,value)=>total+value,'');
        display.textContent=show;
    }
}
function undoInput(){
    if(typeof holdValues[holdValues.length-1]=='number'){
        if(Math.floor(holdValues[holdValues.length-1]/10)>0){
            holdValues[holdValues.length-1]=Math.floor(holdValues[holdValues.length-1]/10);
        }
        else{
            holdValues.pop();
        }
    }
    else if(typeof holdValues[holdValues.length-1]=='string'){
        holdValues.pop();
    }
    showCalculation();
}
function getCalculation(){
    if(holdValues.length>=3 && typeof holdValues[0]=='number'){
        while(holdValues.includes('*')||holdValues.includes('/')){
            if(holdValues.includes('*') && holdValues.includes('/')){
                if(holdValues.indexOf('*')<holdValues.indexOf('/')){
                    holdValues.splice(holdValues.indexOf('*')-1,3,holdValues[holdValues.indexOf('*')-1]*holdValues[holdValues.indexOf('*')+1]);
                }
                else{
                    holdValues.splice(holdValues.indexOf('/')-1,3,holdValues[holdValues.indexOf('/')-1]/holdValues[holdValues.indexOf('/')+1]);
                }
            }
            else if(holdValues.includes('*')){
                holdValues.splice(holdValues.indexOf('*')-1,3,holdValues[holdValues.indexOf('*')-1]*holdValues[holdValues.indexOf('*')+1]);
            }
            else if(holdValues.includes('/')){
                holdValues.splice(holdValues.indexOf('/')-1,3,holdValues[holdValues.indexOf('/')-1]/holdValues[holdValues.indexOf('/')+1]);
            }
        }
        while(holdValues.includes('+')||holdValues.includes('-')){           
            if(holdValues.includes('+')&&holdValues.includes('-')){
                if(holdValues.indexOf('+')<holdValues.indexOf('-')){
                    holdValues.splice(holdValues.indexOf('+')-1,3,holdValues[holdValues.indexOf('+')-1]+holdValues[holdValues.indexOf('+')+1]);
                }
                else{
                    holdValues.splice(holdValues.indexOf('-')-1,3,holdValues[holdValues.indexOf('-')-1]-holdValues[holdValues.indexOf('-')+1]);
                }
            }
            else if(holdValues.includes('+')){
                holdValues.splice(holdValues.indexOf('+')-1,3,holdValues[holdValues.indexOf('+')-1]+holdValues[holdValues.indexOf('+')+1]);
            }
            else if(holdValues.includes('-')){
                holdValues.splice(holdValues.indexOf('-')-1,3,holdValues[holdValues.indexOf('-')-1]-holdValues[holdValues.indexOf('-')+1]);
            }
        }
    }
    if(typeof holdValues[0]=='string'){
        holdValues.shift();
        getCalculation();
    }
    if(holdValues.length==1){
        display.textContent=`${holdValues[0]}`;
    }
    else if(holdValues.length==2){
        display.textContent=`${holdValues[0]}`;
    }
    else{
        display.textContent=`There was an error`;
    }
}
function erase(){
    holdValues=[];
    display.textContent="";
    display.textContent='0';
}

clear.addEventListener('click',()=>{erase()});
percent.addEventListener('click',()=>{includeValue('%')});
divide.addEventListener('click',()=>{includeValue('/')});
one.addEventListener('click',()=>{includeValue(1)});
two.addEventListener('click',()=>{includeValue(2)});
three.addEventListener('click',()=>{includeValue(3)});
multiply.addEventListener('click',()=>{includeValue('*')});
four.addEventListener('click',()=>{includeValue(4)});
five.addEventListener('click',()=>{includeValue(5)});
six.addEventListener('click',()=>{includeValue(6)});
minus.addEventListener('click',()=>{includeValue('-')});
seven.addEventListener('click',()=>{includeValue(7)});
eight.addEventListener('click',()=>{includeValue(8)});
nine.addEventListener('click',()=>{includeValue(9)});
plus.addEventListener('click',()=>{includeValue('+')});
zero.addEventListener('click',()=>{includeValue(0)});
dlt.addEventListener('click',()=>{undoInput()});
equals.addEventListener('click',()=>{getCalculation()});