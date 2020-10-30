function Stick ({ color, sound, name = "", ...props } = {}, { onCollide, ...events } = {}) {
  return make({
    name: `Stick${name}`,
    type: 'cylinder',
    under: '#kit',
    relative: false,
    
    class: "throwable",
    dynamicBody,

    position: "0.5 0.5 0",
    rotation: "57 -52 0", 
    radius: "0.01",
    height: "0.5",
    color: color || randomColor(),
    src: "#light-grid",
    repeat: "5 5",
    sound,
    ...props,
  }, {
    onCollide: debounce((evt) => {
      const { components } = evt.currentTarget;
      if (sound) components.sound.playSound();
      onCollide && onCollide(evt);
    }),
    ...events,
  })
}


function Drum ({ color, name = "", sound = "src: #hit-sound", ...props } = {}, { onCollide, ...events } = {}) {
  const effectiveColor = color || randomColor();
  return make({
    name: `Drum${name}`,
    type: 'cylinder',
    under: '#kit2',
    id: 'clone-btn',
    staticBody,
    radius: "0.1",
    height: "0.1",
    color: effectiveColor,
    src: "#light-grid",
    repeat: "5 5",
    sound,
    ...props
  }, { 
    onCollide: debounce((evt) => {
      const { components } = evt.currentTarget;
      const collider = evt.detail.body.el;
      const name = collider.name || collider.getAttribute('name');

      if (name && name.includes('Stick')) {
        if (sound) components.sound.playSound();
        onCollide && onCollide(evt);
      }
    }, { time: 50 }),
    ...events,
  })
}