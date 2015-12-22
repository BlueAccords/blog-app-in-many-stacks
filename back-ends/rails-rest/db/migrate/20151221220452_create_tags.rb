class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :text   
    end
  end
end
