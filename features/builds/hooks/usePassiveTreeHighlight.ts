import { useEffect } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { Labirynth } from '#enums/labirynth';
import { selectActiveVariant } from '#features/builds/slices/buildSlice';
import { useDispatch, useSelector } from '#hooks/useStore';

type UsePassiveTreeHighlightTypes = {
  selector: string;
  nodes: { skill: string; possibleOutNodes: string[] }[];
  action: ActionCreatorWithPayload<any, string>;
  labirynth?: Labirynth;
};

type HighlightNodesTypes = Omit<UsePassiveTreeHighlightTypes, 'action'>;

const higlightNodes = ({ selector, nodes }: HighlightNodesTypes) => {
  const isInactiveClass = 's0';
  const isHoveredClass = 's1';
  const isActiveClass = 's2';
  document?.querySelectorAll(`${selector} circle`).forEach((circle) => {
    const isRoot = circle.classList.contains('root');
    // const [outNodes] = circle.classList;
    // const [, inNode, outNode] = outNodes.split('-');
    // const isConnectedToRoot =
    //   document.getElementById(`skill-${inNode}`)?.classList.contains('root') ||
    //   document.getElementById(`skill-${outNode}`)?.classList.contains('root');

    if (!isRoot) {
      circle.classList.replace(isActiveClass, isInactiveClass);
      circle.classList.replace(isHoveredClass, isInactiveClass);
    }

    nodes.find((node) => {
      if (node.skill === circle.id) {
        circle.classList.replace(isInactiveClass, isActiveClass);
        circle.classList.replace(isHoveredClass, isActiveClass);
      }

      node.possibleOutNodes.map((on) => {
        if (circle.id === `skill-${on}`) {
          circle.classList.replace(isInactiveClass, isHoveredClass);
        }
      });
    });
  });

  document?.querySelectorAll(`${selector} path`).forEach((path: any) => {
    const [, inNode, outNode] = path.id.split('-');
    // const isConnectedToRoot =
    //   document.getElementById(`skill-${inNode}`)?.classList.contains('root') ||
    //   document.getElementById(`skill-${outNode}`)?.classList.contains('root');

    path.style.stroke = 'var(--secondary-bg)';

    nodes.find((node) => {
      const [, skill] = node.skill.split('-');
      if (path.id.includes(skill)) {
        path.style.stroke = 'var(--secondary-color)';
      }

      if (
        document.querySelector(`${selector} #skill-${inNode}`)?.classList.contains('s2') &&
        document.querySelector(`${selector} #skill-${outNode}`)?.classList.contains('s2')
      ) {
        path.style.stroke = 'var(--primary-color)';
      }
    });
  });
};

function usePassiveTreeHighlight({
  selector,
  nodes,
  action,
  labirynth,
}: UsePassiveTreeHighlightTypes) {
  const dispatch = useDispatch();
  const isWindow = typeof window !== 'undefined';
  const activeVariant = useSelector(selectActiveVariant);

  useEffect(() => {
    if (isWindow) {
      const { classList, id: skill }: any = document?.querySelector(`${selector} circle.root`);
      const [outNodes] = classList;
      const possibleOutNodes = outNodes.split('-').slice(1);

      if (classList.contains('s0')) {
        console.log(activeVariant);
        dispatch(action({ skill, possibleOutNodes, labirynth }));
      }
    }
  }, [action, dispatch, isWindow, activeVariant]);

  useEffect(() => {
    if (isWindow) {
      higlightNodes({ selector, nodes });
    }
  }, [isWindow, nodes, labirynth, selector]);
}

export default usePassiveTreeHighlight;
