function main() {
   const canvas = document.getElementById('asg0');
   if (!canvas) {
     console.error('Failed to retrieve the <canvas> element');
     return false;
   }
 
   const ctx = canvas.getContext('2d');
   ctx.fillStyle = 'black';
   ctx.fillRect(0, 0, 400, 400);
 
   window.canvas = canvas; // Store globally for other functions
   window.ctx = ctx;
 }
 
 function drawVector(v, color) {
   ctx.strokeStyle = color;
   ctx.beginPath();
   ctx.moveTo(canvas.width / 2, canvas.height / 2);
   ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20);
   ctx.stroke();
 }
 
 function handleDrawEvent() {
   const x = parseFloat(document.getElementById('xcoord').value);
   const y = parseFloat(document.getElementById('ycoord').value);
   const x2 = parseFloat(document.getElementById('xcoord2').value);
   const y2 = parseFloat(document.getElementById('ycoord2').value);
 
   resetCanvas();
 
   const v1 = new Vector3([x, y, 0.0]);
   drawVector(v1, 'red');
   const v2 = new Vector3([x2, y2, 0.0]);
   drawVector(v2, 'blue');
 }
 
 function handleDrawOperationEvent() {
   const x = parseFloat(document.getElementById('xcoord').value);
   const y = parseFloat(document.getElementById('ycoord').value);
   const x2 = parseFloat(document.getElementById('xcoord2').value);
   const y2 = parseFloat(document.getElementById('ycoord2').value);
   const operator = document.getElementById('opt').value;
   const scalar = parseFloat(document.getElementById('scalar')?.value) || 1;
 
   resetCanvas();
 
   const v1 = new Vector3([x, y, 0.0]);
   drawVector(v1, 'red');
   const v2 = new Vector3([x2, y2, 0.0]);
   drawVector(v2, 'red');
 
   if (operator === 'Add') {
     v1.add(v2);
     drawVector(v1, 'green');
   } else if (operator === 'Subtract') {
     v1.sub(v2);
     drawVector(v1, 'green');
   } else if (operator === 'Multiply') {
     v1.mul(scalar);
     drawVector(v1, 'green');
     v2.mul(scalar);
     drawVector(v2, 'green');
   } else if (operator === 'Divide') {
     v1.div(scalar);
     drawVector(v1, 'green');
     v2.div(scalar);
     drawVector(v2, 'green');
   } else if (operator === 'Mag') {
     console.log(`Magnitude v1: ${v1.magnitude()}`);
     console.log(`Magnitude v2: ${v2.magnitude()}`);
   } else if (operator === 'Norm') {
     drawVector(v1.normalize(), 'green');
     drawVector(v2.normalize(), 'green');
   } else if (operator === 'Ang') {
     console.log(`Angle: ${angleBetween(v1, v2).toFixed(2)}`);
   } else if (operator === 'Area') {
     console.log(`Area of this triangle: ${areaTriangle(v1, v2).toFixed(2)}`);
   }
 }
 
 function resetCanvas() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = 'black';
   ctx.fillRect(0, 0, 400, 400);
 }
 
 function angleBetween(v1, v2) {
   const d = Vector3.dot(v1, v2);
   const alpha = Math.acos(d / (v1.magnitude() * v2.magnitude()));
   return (alpha * 180) / Math.PI;
 }
 
 function areaTriangle(v1, v2) {
   const cross = Vector3.cross(v1, v2).elements;
   return new Vector3(cross).magnitude() / 2;
 }
 