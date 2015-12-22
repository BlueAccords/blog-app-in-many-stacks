class TagsController < BaseController
#  skip_before_filter :authenticate_user_from_token!, :except => [:create, :update, :delete]

  before_filter :check_if_tag_exists
  # @description POST /posts   
  # @return {Object} post - JSON Object of the Post 
  # @param {String} title - The Title of the Post. Required.
  # @param {String} body - The Body of the Post. Required.
  def create

    tagging = Tagging.create(:tag_id => @tag.id, :post_id => params[:post_id])

    # On Error /views/registrations/error
    respond_with @post do 
      'registrations/error' unless @post.save
    end
  end


  private

    def tag_params
      params.permit(:post_id).require(:tag).permit(:text)
    end

    # See if the tag exists already.  
    def check_if_tag_exists
      begin
        puts tag_params
        
        @tag = Tag.where(:text => params[:tag][:text])
      rescue
        puts tag_params
        @tag = Tag.create(tag_params)
      end
      puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      puts @tag
    end   

    # # Make sure user exists.  That way if not, we can throw a 404
    # def ensure_user_exists
    #   begin
    #     User.find(params[:user_id])
    #   rescue
    #     render_not_found('user', (params[:user_id]))
    #   end
    # end    

    # def check_url_path
    #   if params[:post].has_key?(:url_path) 
    #     @url_path = (params[:post][:url_path]).to_s.parameterize
    #   else  
    #     @url_path = (params[:post][:title]).to_s.parameterize + '-' + Time.now.utc.iso8601
    #   end
    # end

end
