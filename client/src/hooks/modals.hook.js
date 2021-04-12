import {useCallback} from 'react';

export const useModal = () => {
   return useCallback(selector => {
      if (window.M) {
         const elem = document.querySelector(selector);
         const instance = window.M.Modal.init(elem);

         return instance
      }
   }, [])
}