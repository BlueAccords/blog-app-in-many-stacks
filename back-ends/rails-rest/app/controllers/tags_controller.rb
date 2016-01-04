class TagsController < BaseController
  skip_before_filter :authenticate_user_from_token!, :only => [:index]

  # @description POST /tags   
  # @return {Object} tag - JSON Object of the Tag 
  # @param {String} text - The text of the tag. Required.
  def create
    @tag = Tag.new()
    @tag.text = params[:tag][:text].to_s.parameterize

    # On Error /views/helpers/errors
    respond_with @tag do 
      'helpers/errors' unless @tag.save
    end
  end

  # @description GET /tags   
  # @param {String} (Optional URL Param) Get Tag by :text
  # @return {Object[]} tags - Array Object of all Tags 
  def index 
    if !params[:text].blank?
      @tag = Tag.find_by(:text => params[:text])
      if @tag.nil?
        render_not_found('tag', params[:text], 'text')
      else 
        render 'tags/show'
      end
    else 
      @tags = Tag.all 
    end 
  end 

  # @description PUT /tags/:id   
  # @return {Object} tag - JSON Object of the Tag 
  # @param {String} text - The text of the tag.
  def update
    @tag = Tag.find(params[:id])

    updates = { :text => params[:tag][:text].to_s.parameterize }.as_json
  
    if @tag.update(updates)
      render 'tags/show'
    else
      respond_with @tag do 
        'helpers/errors'
      end
    end
  end

  # @description DELETE /tags/:id 
  # @return {Object} deleted_id - id of the Tag deleted
  def destroy
    tag = Tag.find(params[:id])
    if tag.destroy
      render json: { deleted_id: params[:id].to_i }
    else 
      render json: tag.errors
    end 
  end  

  private

    def tag_params
      params.require(:tag).permit(:text)
    end  
end
