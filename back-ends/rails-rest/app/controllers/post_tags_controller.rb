class PostTagsController < BaseController

  skip_before_filter :authenticate_user_from_token!

  # @description POST /toggle-tag-on-post   
  # @return {Object} post - JSON Object of the Post 
  # @param {String} post_id - The ID of the Post
  # @param {String} tag_id - The ID of the Tag
  def toggle_tag_on_post
    if params[:status] == true
      create
    else 
      begin 
        @post_tag = PostTag.where(:post_id => params[:post_id], :tag_id => params[:tag_id] ).first
        destroy
      rescue 
        custom_not_found(params[:post_id], params[:tag_id])
      end
      
    end   
  end

  def create 
    @post_tag = PostTag.where(:post_id => params[:post_id], :tag_id => params[:tag_id] ).first_or_create
    if @post_tag.save
      @post = Post.find(params[:post_id])
      render 'posts/show'     
    else     
      respond_with @post_tag do 
        'helpers/errors' 
      end 
    end     
  end 

  def destroy 
    if @post_tag.destroy 
      @post = Post.find(params[:post_id])
      render 'posts/show' 
    else 
      respond_with @post_tag do 
        'helpers/errors'  
      end   
    end  
  end 

  private 
    def pt_params
      params.require(:post_id, :tag_id, :status)
    end

    def post_tag_exists?
      return (PostTag.where(:post_id => params[:post_id], :tag_id => params[:tag_id])) ? true : false
    end
    # Renders a custom error response if not found
    def custom_not_found(post_id, tag_id)
      payload = { errors: { general: ["Could not find post_tag with post_id: #{post_id} and tag_id: #{tag_id}"] } }
      render json: payload, status: 400
    end  

end