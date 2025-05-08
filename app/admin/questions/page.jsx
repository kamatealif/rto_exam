'use client';

import { useState, useEffect } from 'react';
import { Client } from 'appwrite';
import { appwriteConfig } from '../../../appwrite.config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Tag, List, CheckCircle2, Image, Plus } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      question_text: '',
      category: '',
      options: ['', '', '', ''],
      correct: '',
      image: '',
    },
  });

  // const checkAdmin = async () => {
  //   try {
  //     const client = new Client();
  //     client
  //       .setEndpoint(appwriteConfig.endpoint)
  //       .setProject(appwriteConfig.projectId);

  //     const user = await client.account.get();
  //     // Add your admin check logic here
  //     // For example, check if user has admin role
  //     if (!user.roles.includes('admin')) {
  //       window.location.href = '/login';
  //     }
  //   } catch (error) {
  //     window.location.href = '/login';
  //   }
  // };

  // Responsive container styles
  const containerStyles = {
    container: 'min-h-screen flex flex-col items-center justify-center p-4',
    form: 'w-full max-w-2xl space-y-8',
    questions: 'w-full max-w-3xl',
  };

  useEffect(() => {
    const client = new Client();
    client
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId);

    // checkAdmin();
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

      const storage = new Storage(client);
      const fileResponse = await storage.createFile(
        'questions',
        file.name,
        file,
        ['role:admin']
      );

      form.setValue('image', fileResponse.$id);
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

      const database = new Databases(client);
      const data = {
        question_text: form.getValues('question_text'),
        options: form.getValues('options').join(','),
        correct: form.getValues('correct'),
        image_id: form.getValues('image') || '',
        category: form.getValues('category')
      };

      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collectionId,
        'unique()',
        data
      );

      form.reset();
      setImagePreview(null);
      setError('');

      fetchQuestions();
    } catch (error) {
      console.error('Error adding question:', error);
      setError('Failed to add question');
    }
  };

  return (
    <div className={containerStyles.container}>
      <div className={containerStyles.form}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Admin Questions</h1>
          <p className="text-sm text-muted-foreground">
            Manage your questions here
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddQuestion)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  <Label>Question Text</Label>
                </div>
                <div className="relative">
                  <Input
                    {...form.register('question_text')}
                    placeholder="Enter your question here"
                    className="w-full"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {form.watch('question_text')?.length || 0}/200
                  </span>
                </div>
                {form.formState.errors.question_text && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.question_text.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <Label>Category</Label>
                </div>
                <Select
                  onValueChange={(value) => form.setValue('category', value)}
                  defaultValue={form.getValues('category')}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="traffic-signs">Traffic Signs</SelectItem>
                    <SelectItem value="speed-limits">Speed Limits</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <List className="h-4 w-4 text-muted-foreground" />
                  <Label>Options</Label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['A', 'B', 'C', 'D'].map((letter, index) => (
                    <div key={letter} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{letter}. </span>
                        <div className="relative">
                          <Input
                            {...form.register(`options.${index}`)}
                            placeholder={`Option ${letter}`}
                            className="w-full"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {form.watch(`options.${index}`)?.length || 0}/50
                          </span>
                        </div>
                      </div>
                      {form.formState.errors.options?.[index] && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.options[index].message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <Label>Correct Answer</Label>
                </div>
                <Select
                  onValueChange={(value) => form.setValue('correct', value)}
                  defaultValue={form.getValues('correct')}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {form.watch('options')?.map((option, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {String.fromCharCode(65 + index)}. {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.correct && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.correct.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4 text-muted-foreground" />
                  <Label>Image (optional)</Label>
                </div>
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageUpload(e.target.files[0]);
                      }
                    }}
                    className="w-full"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {imagePreview ? 'Selected' : 'No file chosen'}
                  </span>
                </div>
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-sm rounded-lg"
                    />
                  </div>
                )}
                {form.formState.errors.image && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.image.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                <div className="flex items-center justify-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Question
                </div>
              </Button>
            </div>
          </form>
        </Form>

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
                    <Card key={question.$id} className="w-full max-w-2xl">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-medium">{question.question_text}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <Badge variant="outline">{question.category}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            {question.options.split(',').map((option, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{String.fromCharCode(65 + index)}. </span>
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <Badge variant="success">
                              Correct Answer: {question.correct}
                            </Badge>
                          </div>
                          {question.image && (
                            <div className="mt-2">
                              <img
                                src={question.image}
                                alt={question.question_text}
                                className="w-48 h-48 object-cover rounded-lg"
                              />
                            </div>
                          )}
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
    </div>
  );
}
