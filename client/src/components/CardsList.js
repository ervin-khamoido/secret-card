export const CardsList = ({cards}) => {
   // if (!cards.length) {
   //    return <p className="center">No cards</p>
   // }

   return (
      <table className="striped highlight centered">
         <thead>
            <tr>
               <th>Title</th>
               <th>Date of creation</th>
               <th>Date of disappearance</th>
               <th>For how many readers</th>
               <th>Views</th>
               <th>Viewed</th>
               <th>Password</th>
            </tr>
         </thead>

         <tbody>
            {cards.map((card, index) => {
               let howManyReaders = 'One-person';
               let isViewed = '—';

               if (!card.isForOneReader) {
                  howManyReaders = 'For many'
               }

               if (card.isViewed) {
                  isViewed = '+'
               }

               return (
                  <tr key={card._id}>
                     <td>{card.title}</td>
                     <td>{card.dateOfCreation}</td>
                     <td>{card.timeBeforeRemove}</td>
                     {/* <td>{card.isForOneReader}</td> */}
                     <td>{howManyReaders}</td>
                     <td>{card.views}</td>
                     <td>{isViewed}</td>
                     {/* <td>{card.password}</td> */}
                     <td><i className="material-icons" style={{cursor: 'pointer'}}>visibility</i></td>
                  </tr>
               )
            })}
         </tbody>
      </table>
   )
}