class CommentsController < BaseController
  skip_before_filter :authenticate_user_from_token!, :only => [:index]
  before_filter :ensure_current_user_is_owner, :only => [:delete, :update]

  # @description GET /posts/:post_id/comments   
  # @param {String} post_id (URL Param) The Post ID
  # @return {Object[]} comments - Array Object of all Comments 
  def index 
    @comments = Comment.where(:post_id => params[:post_id])
  end 

  # @description POST /posts/:post_id/comments   
  # @return {Object} comment - JSON Object of the Comment 
  # @param {String} text - The text of the comment. Required.
  def create
    @comment = Comment.new()
    @comment.user_id = current_user.id
    @comment.post_id = params[:post_id]
    @comment.text = params[:comment][:text]

    # On Error /views/helpers/errors
    respond_with @comment do 
      'helpers/errors' unless @comment.save
    end
  end  

  # @description PUT /comments/:id   
  # @return {Object} comment - JSON Object of the Comment 
  # @param {String} text - The text of the Comment.
  def update
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      render 'comments/show'
    else
      respond_with @comment do 
        'helpers/errors'
      end
    end
  end

  # @description DELETE /comments/:id 
  # @return {Object} deleted_id - id of the Comment deleted
  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      render json: { deleted_id: params[:id].to_i }
    else 
      render json: comment.errors
    end 
  end   

  private

    def comment_params
      params.require(:comment).permit(:text)
    end 

    def ensure_current_user_is_owner
      current_comment = Comment.find_by(:id => params[:id])
      render_unauthorized unless  current_comment.user_id == current_user.id
    end     
end