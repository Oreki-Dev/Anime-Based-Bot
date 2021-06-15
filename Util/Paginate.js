const { MessageEmbed } = require('discord.js');

module.exports = class Paginate{
  constructor(...array){

    this._array = [ ...array ].flat();

    this._index = 0;

    // Validate array content
    this._validate();
  };

  add(...item){
    this._array.push(...item.flat());
    this._validate()
    return [ ...item.flat() ];
  };

  delete(index){
    if (typeof index !== 'number'){
      return [];
    } else {
      if (index === this.currentIndex){
        if (this.currentIndex > 0){
          this.previous();
        };
      } else if (this.currentIndex === this.tail){
        this.previous();
      };
      return this._array.splice(index,1);
    };
  };

  next(){
    if (!this._array.length){
      return undefined;
    };
    if (this._index === this.tail) this._index = -1;
    this._index++;
    return this._array[this._index];
  }

  previous(){
    if (!this._array.length){
      return undefined;
    };
    if (this._index === 0) this._index = this.tail + 1;
    this._index--;
    return this._array[this._index];
  }

  get currentPage(){
    return this._array[this._index];
  }

  get firstPage(){
    return this._array[0];
  }
  
  get lastPage(){
    return this._array[this.tail];
  }

  get currentIndex(){
    return this._index
  }

  get size(){
    return this._array.length;
  };

  get tail(){
    return this._array.length > 0
    ? this._array.length - 1
    : null;
  };

  _validate(){
    for (const el of this._array){
      if (!(el instanceof MessageEmbed)){
        throw new Error('Paginate: Passed argument is not an instance of MessageEmbed!')
      };
    };
    return;
  };
};
