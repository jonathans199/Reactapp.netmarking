import React, { Component } from 'react'


export default class Img extends Component {

  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Selecciona una foto para mostrarla</div>);
    }

    return (
    <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-heading"  >
              <svg className="glyph stroked download" ><use xlinkHref="#stroked-download"/></svg>
                Cambiar Imagen
            </div>
              <div className="previewComponent">
              <div className="row">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
              <div className="col-md-3">
                <input className="fileInput" 
                  type="file" 
                  onChange={(e)=>this._handleImageChange(e)} />
              </div>
                </form>
                </div>
                <div className="imgPreview">
                {$imagePreview}
                </div>
                 
                  </div>
                    <button className="submitButton" 
                  type="submit" 
                  onClick={(e)=>this._handleSubmit(e)}>Aceptar cambios</button>
              </div>
            </div>
      
      
    )
  }
}