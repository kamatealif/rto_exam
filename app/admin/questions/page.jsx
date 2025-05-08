'use client';

import { useState, useEffect } from 'react';
import { Client } from 'appwrite';
import { appwriteConfig } from '../../../appwrite.config';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question_text: '',
    options: ['', '', '', ''],
    correct: '',
    image: null,
    category: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const client = new Client();
    client
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId);

    // Check if user is admin
    const checkAdmin = async () => {
      try {
        const user = await client.account.get();
        // Add your admin check logic here
        // For example, check if user has admin role
        if (!user.roles.includes('admin')) {
          window.location.href = '/login';
        }
      } catch (error) {
        window.location.href = '/login';
      }
    };

    checkAdmin();
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const client = new Client();
      client
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId);

      const response = await client.database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId
      );
      setQuestions(response.documents);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to fetch questions');
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const client = new Client();
      client
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId);

      const fileResponse = await client.storage.createFile(
        'unique()',
        file,
        ['role:member']
      );

      setNewQuestion({ ...newQuestion, image: fileResponse.$id });
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image');
    }
  };

  const handleAddQuestion = async () => {
    try {
      const client = new Client();
      client
        .setEndpoint(appwriteConfig.endpoint)
        .setProject(appwriteConfig.projectId);

      const data = {
        question_text: newQuestion.question_text,
        options: newQuestion.options.join(','),
        correct: newQuestion.correct,
        image_id: newQuestion.image || '',
        category: newQuestion.category
      };

      await client.database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        'unique()',
        data
      );

      setNewQuestion({
        question_text: '',
        options: ['', '', '', ''],
        correct: '',
        image: null,
        category: ''
      });
      setImagePreview(null);
      setError('');

      fetchQuestions();
    } catch (error) {
      console.error('Error adding question:', error);
      setError('Failed to add question');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-20 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Admin Questions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your questions here
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddQuestion();
          }}>
            <div className="space-y-4">
              <div>
                <Label>Question Text</Label>
                <Input
                  value={newQuestion.question_text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question_text: e.target.value })}
                  required
                  placeholder="Enter your question here"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Input
                  value={newQuestion.category}
                  onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                  required
                  placeholder="e.g., Traffic Signs, Speed Limits"
                />
              </div>

              <div>
                <Label>Options</Label>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="mt-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = e.target.value;
                        setNewQuestion({ ...newQuestion, options: newOptions });
                      }}
                      required
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <Label>Correct Answer</Label>
                <Input
                  value={newQuestion.correct}
                  onChange={(e) => setNewQuestion({ ...newQuestion, correct: e.target.value })}
                  required
                  placeholder="Enter the correct answer"
                />
              </div>

              <div>
                <Label>Image (optional)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-sm rounded"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive rounded-md p-4 mb-4">
                  <div className="text-sm">{error}</div>
                </div>
              )}

              <Button className="w-full">
                Add Question
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>All Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Existing Questions</h2>
              <div className="space-y-4">
                {questions.map((question) => (
                  <Card key={question.$id}>
                    <CardContent>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{question.question_text}</h3>
                          <p className="text-sm text-muted-foreground">Category: {question.category}</p>
                          <div className="mt-2">
                            {question.options.split(',').map((option, index) => (
                              <div key={index} className="flex items-center">
                                <span className="mr-2">{String.fromCharCode(65 + index)}. </span>
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                          <p className="mt-2 text-green-600 font-medium">
                            Correct Answer: {question.correct}
                          </p>
                        </div>
                        <div className="ml-4">
                          {question.image && (
                            <img
                              src={question.image}
                              alt={question.question_text}
                              className="w-24 h-24 object-cover rounded"
                            />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
