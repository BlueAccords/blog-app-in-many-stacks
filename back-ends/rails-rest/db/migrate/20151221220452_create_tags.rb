class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :text

      # Associations 
      t.index :post_id
      t.belongs_to :post, null: false      
    end
  end
end
