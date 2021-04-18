   // const createCardForm = document.querySelector('.card');
   // console.log(createCardForm.getElementsByTagName('*'));
   // const elemsFromCard = createCardForm.getElementsByTagName('*');
   // const keys = Object.keys(elemsFromCard);
   // console.log(keys.length);

   // keys.forEach(item => {
   //    console.log(item, elemsFromCard[item]);
   //    console.log('!!!!', item.getElementsByTagName('*'));
   // })

   // createCardForm.getElementsByTagName('*').forEach(item => {
   //    if (item.classList.contains('active') || item.classList.contains('valid') || item.classList.contains('character-counter')) {
   //       console.log(item);
   //    }
   // })

   export function findChildNodes(elems) {
      // console.log('1 elem', elems);

      if (typeof elems === 'object') {
         // console.log('is obj', elems);

         const keys = Object.keys(elems);

         keys.forEach(item => {
            // console.log('elem of array', elems[item]);

            // if (elems[item].classList.contains('active') || elems[item].classList.contains('valid') || elems[item].classList.contains('character-counter')) {
            //    console.log('HAS CLASS', elems[item]);
            // }

            if (elems[item].childNodes && elems[item].nodeType === 1) {
               if (elems[item].classList.contains('active') || elems[item].classList.contains('valid') || elems[item].classList.contains('character-counter')) {
                  console.log('HAS CLASS', elems[item]);
               }
               // console.log('elem of obj has children', elems[item].childNodes);
               findChildNodes(elems[item].childNodes);
            } 
            // else {
            //    console.log('не имеет детей 0', elems[item]);
            // }
         })
      }

   //    if (elems.childNodes && elems.nodeType) {
   //       console.log('элем не массив', elems.childNodes);
   //       findChildNodes(elems.childNodes);
   //    } else {
   //       if (elems.childNodes && elems.nodeType === 1 && (elems.classList.contains('active') || elems.classList.contains('valid') || elems.classList.contains('character-counter'))) {
   //          console.log('не имеет детей NAD HAS CLASS', elems);
   //       }
   //    }

      // console.log('End');
      // return 0;
   }

   // findChildNodes(createCardForm);