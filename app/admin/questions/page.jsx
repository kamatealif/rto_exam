"use client";

import { useState, useEffect } from "react";
import { Client } from "appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Tag, CheckCircle2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Account } from "appwrite";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      question_text: "",
      category: "",
      options: ["", "", "", ""],
      correct: "",
      image: "",
    },
  });

  // const checkAdmin = async () => {
  //   try {
  //     const client = new Client();
  //     client
  //       .setEndpoint(Account.endpoint)
  //       .setProject(Account.projectId);

  //     const user = await client.Account.get();
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
    container: "min-h-screen flex flex-col items-center justify-center p-4",
    form: "w-full max-w-2xl space-y-8",
    questions: "w-full max-w-3xl",
  };

  useEffect(() => {
    const client = new Client();
    client.setEndpoint(Account.endpoint).setProject(Account.projectId);

    // checkAdmin();
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const client = new Client();
      client.setEndpoint(Account.endpoint).setProject(Account.projectId);

      const response = await client.database.listDocuments(
        Account.databaseId,
        Account.collectionId
      );
      setQuestions(response.documents);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions");
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const client = new Client();
      client.setEndpoint(Account.endpoint).setProject(Account.projectId);

      const storage = new Storage(client);
      const fileResponse = await storage.createFile(
        "questions",
        file.name,
        file,
        ["role:admin"]
      );

      form.setValue("image", fileResponse.$id);
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image");
    }
  };

  const handleAddQuestion = async () => {
    try {
      const client = new Client();
      client.setEndpoint(Account.endpoint).setProject(Account.projectId);

      const database = new Databases(client);
      const data = {
        question_text: form.getValues("question_text"),
        options: form.getValues("options").join(","),
        correct: form.getValues("correct"),
        image_id: form.getValues("image") || "",
        category: form.getValues("category"),
      };

      await database.createDocument(
        Account.databaseId,
        Account.collectionId,
        "unique()",
        data
      );

      form.reset();
      setImagePreview(null);
      setError("");

      fetchQuestions();
    } catch (error) {
      console.error("Error adding question:", error);
      setError("Failed to add question");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container flex-1">
        <div className="max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold mb-6">Manage Questions</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddQuestion)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question_text">Question Text</Label>
                  <Input
                    id="question_text"
                    {...form.register("question_text", {
                      required: "Question text is required",
                    })}
                  />
                  <FormMessage />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    onValueChange={form.setValue.bind(form, "category")}
                    defaultValue={form.getValues("category")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="theory">Theory</SelectItem>
                      <SelectItem value="practical">Practical</SelectItem>
                      <SelectItem value="multiple_choice">
                        Multiple Choice
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="options.0">Option A</Label>
                    <Input
                      id="options.0"
                      {...form.register("options.0", {
                        required: "Option A is required",
                      })}
                    />
                    <FormMessage />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="options.1">Option B</Label>
                    <Input
                      id="options.1"
                      {...form.register("options.1", {
                        required: "Option B is required",
                      })}
                    />
                    <FormMessage />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="options.2">Option C</Label>
                    <Input
                      id="options.2"
                      {...form.register("options.2", {
                        required: "Option C is required",
                      })}
                    />
                    <FormMessage />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="options.3">Option D</Label>
                    <Input
                      id="options.3"
                      {...form.register("options.3", {
                        required: "Option D is required",
                      })}
                    />
                    <FormMessage />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="correct">Correct Answer</Label>
                  <Select
                    onValueChange={form.setValue.bind(form, "correct")}
                    defaultValue={form.getValues("correct")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Option A</SelectItem>
                      <SelectItem value="1">Option B</SelectItem>
                      <SelectItem value="2">Option C</SelectItem>
                      <SelectItem value="3">Option D</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Question Image</Label>
                  <Input
                    type="file"
                    id="image"
                    {...form.register("image")}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setImagePreview(event.target.result);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                  <FormMessage />
                </div>
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? "Saving..." : "Save Question"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
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
                          <h3 className="font-medium">
                            {question.question_text}
                          </h3>
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
                          {question.options.split(",").map((option, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <span className="text-sm text-muted-foreground">
                                {String.fromCharCode(65 + index)}.{" "}
                              </span>
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
  );
}
