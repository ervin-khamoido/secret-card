export const CardsList = ({cards}) => {
   if (!cards.length) {
      return <p className="center">No cards</p>
   }

   return (
      <table className="striped highlight centered">
         <thead>
            <tr>
               <th>№</th>
               <th>Title</th>
               <th>Date of creation</th>
               <th>Date of disappearance</th>
               <th>For how many readers</th>
               <th>Views</th>
               <th>Viewed</th>
               <th>Password</th>
               <th>Delete</th>
            </tr>
         </thead>

         <tbody>
            {cards.map((card, index) => {
               let howManyReaders = 'One-person';
               let isViewed = '—';
               let timeBeforeRemove = card.timeBeforeRemove;

               if (!card.isForOneReader) {
                  howManyReaders = 'For many'
               }

               if (card.isViewed) {
                  isViewed = '+'
               }

               if (!card.timeBeforeRemove) {
                  timeBeforeRemove = 'none';
               }
                  // .toLocaleString('en-GB', {timeZone: 'UTC'})
               console.log('time', card.dateOfCreation);

               return (
                  <tr key={card._id}>
                     <td>{index + 1}</td>
                     <td>{card.title}</td>
                     <td>{card.dateOfCreation.toLocaleString('en-GB', {timeZone: 'UTC'})}</td>
                     <td>
                        {timeBeforeRemove}
                        {Math.round(card.timeBeforeRemove / 60 / 24)} d &nbsp;
                        {Math.round(card.timeBeforeRemove / 60)} m
                     </td>
                     {/* <td>{card.isForOneReader}</td> */}
                     <td>{howManyReaders}</td>
                     <td>{card.views}</td>
                     <td>{isViewed}</td>
                     {/* <td>{card.password}</td> */}
                     <td><i className="material-icons" style={{cursor: 'pointer'}}>visibility</i></td>
                     <td style={{fontSize: '30px', color: '#d32f2f', fontWeight: '900'}}>&times;</td>
                  </tr>
               )
            })}
         </tbody>
      </table>
   )
}