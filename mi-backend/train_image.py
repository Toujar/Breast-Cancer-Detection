import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms, models
import os

# Transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# Dataset
train_dataset = datasets.ImageFolder("dataset/images/train", transform=transform)
test_dataset = datasets.ImageFolder("dataset/images/test", transform=transform)

train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=16, shuffle=False)

# Pretrained CNN (ResNet18)
model = models.resnet18(pretrained=True)
model.fc = nn.Linear(model.fc.in_features, 2)  # binary classification

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
for epoch in range(3):  # small epochs for demo
    model.train()
    for images, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
    print(f"Epoch {epoch+1} done")

# Save model as ONNX
os.makedirs("model", exist_ok=True)
dummy_input = torch.randn(1, 3, 224, 224)
torch.onnx.export(model, dummy_input, "model/cnn_model.onnx")

print("✅ CNN model trained and saved as ONNX!")
