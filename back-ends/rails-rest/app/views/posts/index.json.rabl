collection @posts, :root => "posts", :object_root => false

extends('posts/post-base', :locals => {:just_tag_ids => false})
