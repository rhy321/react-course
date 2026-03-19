import { useRef, useEffect } from 'react'

function useAutoScroll(dependency_array){

  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if(containerElem){
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependency_array] );

  return chatMessagesRef;
}

export default useAutoScroll;