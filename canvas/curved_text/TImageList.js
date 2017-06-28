/**
 *  Class TImageList v1.15
 *  @author: Skinner (fenixphp@gmail.com)
 *  
 *  Constructor ----------------------------------------------------------------
 *  @config.list[] = {name: String, src: String, root: Boolean}
 *  @config.rootURL = String;
 *  
 *  @config.callback_beginload = function(){}
 *  @config.callback_onload = function(id, name, src, image){}
 *  @config.callback_onerror = function(id, name, src){}
 *  @config.callback_onabort = function(id, name, src){}
 *  @config.callback_endload = function(){}
 *  
 *  function addImage(items) ---------------------------------------------------
 *  items[] = {name: String, src: String, root: Boolean}
 *  
 *  function deleteImage(item_) ------------------------------------------------
 *  item_ = String(name) / Int(ID)
 *  
 *  function getImage(item_) ---------------------------------------------------
 *  item_ = String(name) / Int(ID)
 */

function TImageList(config){
    
  if(typeof(config.callback_beginload) == 'function'){
    this.callback_beginload = config.callback_beginload;
  }
  
  if(typeof(config.callback_onload) == 'function'){
    this.callback_onload = config.callback_onload;
  }
  
  if(typeof(config.callback_onerror) == 'function'){
    this.callback_onerror = config.callback_onerror;
  }
  
  if(typeof(config.callback_onabort) == 'function'){
    this.callback_onabort = config.callback_onabort;
  }
  
  if(typeof(config.callback_endload) == 'function'){
    this.callback_endload = config.callback_endload;
  }
  
  if(typeof(config.rootURL) == 'string'){
    this._rootURL = config.rootURL;
  }
  
  if(typeof(config.list) == 'object'){
    this._initImageList(config.list);
  }
  
}

TImageList.prototype = {
  _rootURL: '',
  _images: new Array(),
  _cCount: 0,
  _lCount: 0,
  
  _initImageList: function(items){
  
    this._cCount = this._images.length;
    this._lCount = items.length;
    
    console.log('Begin images loaded...');
    if(typeof(this.callback_beginload) == 'function'){
      this.callback_beginload();
    }
    
    for(var i = 0; i < items.length; i++) {
      this._addImage(items[i]);
    }
    
  },
  
  _getImageID: function(item_){
    for(var i = 0; i < this._images.length; i++) {
      if(this._images[i] === item_){
        return i;
        break;
      }
    }
    
    return -1;
  },
  
  _addImage: function(item_){
    var self = this;
    var timg = new Image();
    
    timg.name = item_.name;
    
    timg.onload = function(){
      self._images.push(this);
      
      var nID = self._getImageID(this);
      console.log('Image is loaded: id="'+nID+'" name="'+this.name+'" src:"'+this.src+'".');
      
      if(typeof(self.callback_onload) == 'function'){
        self.callback_onload(nID, this.name, this.src, this);
      }
      
      if(self._lCount == (self._images.length - self._cCount)){
        console.log('End images loaded.');
        
        if(typeof(self.callback_endload) == 'function'){
          self.callback_endload();
        } 
      }
    }
    
    timg.onerror = function(){
       console.log('Image not loaded(ERROR): id="N/A" name="'+this.name+'" src:"'+this.src+'".');
       
       if(typeof(self.callback_onerror) == 'function'){
        self.callback_onerror('n/a', this.name, this.src);
       } 
    }
    
    timg.onabort = function(){
      console.log('Image not loaded(ABORT): id="N/A" name="'+this.name+'" src:"'+this.src+'".');
      
      if(typeof(self.callback_onabort) == 'function'){
        self.callback_onabort('n/a', this.name, this.src);
      }  
    }
    
    if(item_.root){
      timg.src = this._rootURL + item_.src;
    }else{
      timg.src = item_.src;
    }  
  },
  
  callback_beginload: function(){},
  
  callback_onload: function(id, name, src, image){},
  
  callback_endload: function(){},
  
  callback_onerror: function(id, name, src){},
  
  callback_onabort: function(id, name, src){},
      
  addImage: function(items){
    this._initImageList(items);
  },
  
  deleteImage: function(item_){
    if(typeof(item_) == 'number'){
      
      if(typeof(this._images[item_]) !== 'undefined'){
        this._images.splice(item_);
        return true;
      }else{
        return false;
      }
      
    }else if(typeof(item_) == 'string'){
      
      for(var i = 0; i < this._images.length; i++) {
        if(this._images[i].name === item_){
          this._images.splice(i);
          return true;
          break;
        }
      }
      
      return false;
    }else{
      return false;
    }
  },
  
  getImage: function(item_){
    if(typeof(item_) == 'number'){
      
      if(typeof(this._images[item_]) !== 'undefined'){
        return this._images[item_];
      }else{
        return null;
      }
      
    }else if(typeof(item_) == 'string'){
      
      for(var i = 0; i < this._images.length; i++) {
        if(this._images[i].name === item_){
          return this._images[i];
          break;
        }
      }
      
      return null;
    }else{
      return null;
    }
  }
}
/** ------------------------------------------------------------------------ **/