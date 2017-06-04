class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :question_id
      t.string :answer

      t.timestamps null: false
    end
  end
end
