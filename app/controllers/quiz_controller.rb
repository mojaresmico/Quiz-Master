class QuizController < ApplicationController
    require 'numbers_in_words'
   
    def index
        @questions = Question.all
    end
    def record_quiz
        @score = 0
        @question_answer = Question.all
        @question_answer.each do |question|

            id = "A"+(question.id).to_s
            answer = params[:"#{id}"]
            exam_answer = Answer.new(question_id: question.id, answer: answer)
            exam_answer.save
           ans_to_int = answer.to_i
           ans_from_db_to_int = question.answer.to_i
            if ans_to_int == 0
                if NumbersInWords.in_numbers(answer).to_s == question.answer.to_s
                    @score+=1
                end 
                if answer == question.answer 
                    @score +=1
                end
            else
                if NumbersInWords.in_words(ans_to_int).to_s ==  NumbersInWords.in_words(ans_from_db_to_int).to_s && answer.to_i == question.answer.to_i
                    @score +=1 
                end 
            end 
           
            
        end 
        
        respond_to do |format|
      format.html { render action: 'quiz_result' }
    end
    end 
end
