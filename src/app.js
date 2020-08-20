(() => {
   const app = document.getElementById('app'),
      switchBtn = document.getElementById('switch'),
      convertBtn = document.getElementById('convert'),
      input = document.getElementById('target'),
      display = document.getElementById('display');
   let flag = true;

   function switchOperation() {
      const targetText = input.previousElementSibling;
      const displayText = display.previousElementSibling;
      flag ? (
         app.dataset.operation = 'dec-to-bin',
         targetText.textContent = 'Decimal',
         displayText.textContent = 'Binary',
         flag = false
      ) : (
            app.dataset.operation = 'bin-to-dec',
            targetText.textContent = 'Binary',
            displayText.textContent = 'Decimal',
            flag = true
         )
      reset()
   }

   const logic = {
      bin2dec: val => parseInt(val, 2),
      dec2bin: val => {
         let temp = parseInt(val)
         let result = ''
         while (temp > 0) {
            temp % 2 == 0 ? (
               result = '0' + result
            ) : (
                  result = '1' + result
               )
            temp = Math.floor(temp / 2)
         }
         return parseInt(result)
      },
      err: (val) => {
         const operation = app.dataset.operation;
         return val ? `${val} is not a binary number. Binaray number are 0's and 1's` :
            operation === 'bin-to-dec' ? 'Enter a binary number' : 'Enter a decimal number'
      }
   }

   function convert() {
      const value = input.value;
      const operation = app.dataset.operation;
      if (operation === 'bin-to-dec') {
         if (value == '') {
            alert(this.err())
            reset()
         }
         value.split('').forEach(val => {
            if (val == '0' || val == '1') {
               display.value = this.bin2dec(value)
            } else {
               alert(this.err(value))
               display.value = ''
               return;
            }
         });
      } else {
         if (value == '') {
            alert(this.err())
            reset()
         }
         display.value = this.dec2bin(value)
      }
   }

   function reset() {
      input.value = ''
      display.value = ''
   }

   // EventListeners
   switchBtn.addEventListener('click', switchOperation);
   convertBtn.addEventListener('click', () => {
      convert.apply(logic)
   })
   addEventListener('keydown', e => {
      if (e.which == 13 || e.keyCode == 13) {
         convert.apply(logic)
      }
   })
})()