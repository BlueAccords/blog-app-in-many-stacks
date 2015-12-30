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
      @post_tag = PostTag.where(:post_id => params[:post_id], :tag_id => params[:tag_id] ) 
      destroy
    end   
  end

  def create 
    @post_tag = PostTag.create(:post_id => params[:post_id], :tag_id => params[:tag_id] )
    if @post_tag.save
       @post = Post.find(params[:post_id])
      respond_with @post do 
        'posts/show' 
      end     
    else     
      respond_with @post_tag do 
        'helpers/errors' 
      end 
    end     
  end 

  def destroy 
    respond_with @post_tag do 
      'helpers/errors' unless @post_tag.destroy
    end     
  end 

  private 
    def pt_params
      params.require(:post_id, :tag_id, :status)
    end

    def post_tag_exists?
      return (PostTag.where(:post_id => params[:post_id], :tag_id => params[:tag_id])) ? true : false
    end
end