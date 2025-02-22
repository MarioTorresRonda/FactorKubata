import useElementPosition from '@/hooks/useElementPosition';
import useWindowSize from '@/hooks/useWindowSize';
import React, { useEffect, useState, useRef } from 'react';

const LazyLoadComponent = ({ children, onHide, onLoad, height }) => {

  const [isVisible, setIsVisible] = useState(false);
  const { ref, position } = useElementPosition();
  const [ windowW, windowH ] = useWindowSize();

  useEffect(() => {
    if ( position.top + height > -50 && position.top -50 < windowH ) {
      if ( !isVisible ) {
        if ( onLoad ) {
          onLoad();
        }
      }
      setIsVisible( true );
    }else{
      if ( isVisible ) {
        if ( onHide ) {
          onHide();
        }
      }
      setIsVisible( false );
    }
  }, [isVisible, onHide, onLoad, position, windowH, height]);

  return (
    <div ref={ref}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazyLoadComponent;